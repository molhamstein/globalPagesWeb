import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gallery, ImageItem, VideoItem } from '@ngx-gallery/core';
import { TranslateService } from '@ngx-translate/core';
import { RequestsService } from 'src/app/services/requests.service';


@Component({
  selector: 'app-ad-view',
  templateUrl: './ad-view.component.html',
  styleUrls: ['./ad-view.component.css']
})
export class AdViewComponent implements OnInit {
  data: any = {};
  toggle1 = true
  toggle2 = true;
  public _albums = [];

  constructor(private gallery: Gallery, private route: ActivatedRoute, private tr: TranslateService, private requestService: RequestsService) { }



  ngOnInit() {



    this.route.data.subscribe(({ adData }) => {
      // console.warn (adData);
      this.data['id'] = adData['id'];
      this.data['phone'] = adData['owner']['phoneNumber'];
      this.data['title'] = adData['title'];
      this.data['description'] = adData['description'];
      var t = new Date(adData['creationDate']);
      this.data['creationDate'] = t.toLocaleDateString();
      this.data['viewsCount'] = adData['viewsCount'];

      this.requestService.post(`posts/${this.data['id']}/viewsCount`, null).subscribe(
        response => {
          this.data['viewsCount']++;
        }
      );

      // this.data['images']= adData['media'];
      for (let i = 0; i < adData['media'].length; i++) {
        const src = adData['media'][i]['url'];
        const caption = 'Image' + adData['media'][i]['id'];
        const thumb = adData['media'][i]['thumbnail'];
        const album = {
          src: src,
          title: caption,
          thumb: thumb
        };
        if (adData['media'][i]['type'] == 'image')
          this._albums.push(new ImageItem(album));
        else
          this._albums.push(new VideoItem(album));
      }
      const galleryRef = this.gallery.ref();
      galleryRef.load(this._albums)
      if (this.tr.currentLang == 'ar') {
        this.data['area'] = adData['city']['nameAr'];
        this.data['subArea'] = adData['location']['nameAr'];
        this.data['category'] = adData['category']['titleAr'];
        this.data['subCategory'] = adData['subCategory']['titleAr'];
      } else {
        this.data['area'] = adData['city']['nameEn'];
        this.data['subArea'] = adData['location']['nameEn'];
        this.data['category'] = adData['category']['titleEn'];
        this.data['subCategory'] = adData['subCategory']['titleEn'];

      }
    })
  }

}
