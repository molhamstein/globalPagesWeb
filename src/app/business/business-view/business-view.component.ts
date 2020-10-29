import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestsService } from '../../requests.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpParams } from '@angular/common/http';
import { latLng } from 'leaflet';
// import {Lightbox} from 'ngx-lightbox';
import { AuthService } from '../../authentication/auth.service';
import { Gallery, GalleryItem, ImageItem, VideoItem } from '@ngx-gallery/core';
import { FollowService } from 'src/app/services/follow.service';
@Component({
  selector: 'app-business-view',
  templateUrl: './business-view.component.html',
  styleUrls: ['./business-view.component.css']
})
export class BusinessViewComponent implements OnInit {

  @ViewChild('products', { static: false }) products;
  @ViewChild('productsModal', { static: false }) productsModal;
  constructor(private gallery: Gallery, private route: ActivatedRoute,
    private api: RequestsService, private translteService: TranslateService,
    private auth: AuthService, private followService: FollowService) { }
  lang
  id
  business
  toggle1 = true;
  albums: GalleryItem[]
  userData;
  isFollowing: boolean;
  ngOnInit() {
    this.auth.userData.subscribe((data) => {
      this.userData = data;
    })

    this.lang = this.translteService.currentLang
    this.translteService.onLangChange.subscribe(() => {
      this.lang = this.translteService.currentLang
    })

    this.route.params.subscribe((params) => {
      this.id = params['id']
      var p = new HttpParams();
      p = p.set('filter', JSON.stringify({
        "where": {
          "or": [{ "nameUnique": this.id }, { "id": this.id }]
        },
        "include": "subCategory"
      }));
      this.api.get('businesses', p).subscribe((data) => {
        this.business = data[0]
        this.isFollowing = this.followService.checkFollowing(this.business['id'], "BUSINESS");
        this.albums = [];
        for (let i = 0; i < this.business['covers'].length; i++) {
          const src = this.business['covers'][i]['url'];
          const caption = 'Image' + this.business['covers'][i]['id'];
          const thumb = this.business['covers'][i]['thumbnail'];
          const album = {
            src: src,
            title: caption,
            thumb: thumb
          };
          if (this.business['covers'][i]['type'] == 'image')
            this.albums.push(new ImageItem(album));
          else
            this.albums.push(new VideoItem(album));
        }
        console.log(this.albums)
        const galleryRef = this.gallery.ref();
        galleryRef.load(this.albums)
        this.business.locationPoint = latLng(this.business.locationPoint)
      })

     
    })
  }
  saveProducts() {
    var business = { ...this.business };
    business['products'] = this.products._products;
    delete this.business["id"];
    this.api.put('businesses\\' + this.id, business).subscribe((data) => {
      this.business = data;
      this.productsModal.close();
    })
  }
  isOwner() {
    if (!(this.userData && this.business))
      return false;
    return this.userData.id == this.business.owner.id;
  }

  toggleFollowing() {
    if (this.isFollowing) {
      this.followService.makeUnfollow(this.business['id'], "BUSINESS").then(res => {
        (res ? this.isFollowing = !this.isFollowing : this.isFollowing);
      });
    }
    else {
      this.followService.makeFollow(this.business['id'], "BUSINESS").then(res => {
        (res ? this.isFollowing = !this.isFollowing : this.isFollowing);
      });
    }
  }


}
