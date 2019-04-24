import { Component, OnInit,ViewChild } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RequestsService} from '../../requests.service';
import {TranslateService} from '@ngx-translate/core';
import {HttpParams} from '@angular/common/http';
import { latLng } from 'leaflet';
import {Lightbox} from 'ngx-lightbox';
import {AuthService} from '../../authentication/auth.service';
import {Gallery, GalleryItem, ImageItem, VideoItem} from '@ngx-gallery/core';
@Component({
  selector: 'app-business-view',
  templateUrl: './business-view.component.html',
  styleUrls: ['./business-view.component.css']
})
export class BusinessViewComponent implements OnInit {

  @ViewChild('products') products;
  @ViewChild('productsModal') productsModal;
  constructor(private gallery: Gallery ,private route:ActivatedRoute,private api:RequestsService,private translteService:TranslateService,public lightbox: Lightbox,private auth:AuthService) { }
  lang
  id
  business
  toggle1=true;
  albums:GalleryItem[]
  userData
  ngOnInit() {
    this.auth.userData.subscribe((data)=>{
      this.userData=data;
    })

    this.lang=this.translteService.currentLang
    this.translteService.onLangChange.subscribe(()=>{
      this.lang=this.translteService.currentLang
    })

    this.route.params.subscribe((params)=>{
      this.id=params['id']
      var p=new HttpParams();
      p=p.set('filter',JSON.stringify({
        "where":{
          "or":[{"nameUnique" : this.id},{"id" : this.id}]},
          "include":"subCategory"
      }));
      this.api.get('businesses',p).subscribe((data)=>{
        this.business=data[0]
        this.albums=[];
        for (let i = 0; i < this.business['covers'].length; i++) {
          const src = this.business['covers'][i]['url'];
          const caption = 'Image' + this.business['covers'][i]['id']  ;
          const thumb = this.business['covers'][i]['thumbnail'];
          const album = {
            src: src,
            title: caption,
            thumb: thumb
          };
          if(this.business['covers'][i]['type']=='image')
            this.albums.push(new ImageItem(album));
          else
            this.albums.push(new VideoItem(album));
        }
        console.log(this.albums)
        const galleryRef = this.gallery.ref();
        galleryRef.load(this.albums)
        this.business.locationPoint=latLng(this.business.locationPoint)
      })
    })
  }
  saveProducts(){
    var business={...this.business};
    business['products']=this.products._products;
    delete this.business["id"];
    this.api.put('businesses\\'+this.id,business).subscribe((data)=>{
      this.business=data;
      this.productsModal.close();
    })
  }
  isOwner(){
    if(!(this.userData&&this.business))
      return false;
    return this.userData.id==this.business.owner.id;
  }


}
// nameEn: "name", nameAr: "bla bla", nameUnique: "bla", logo: "logo.png", status: "activated",…}
// category: {code: "default", titleAr: "مطاعم", titleEn: "Restaurants", creationDate: "2018-08-26T07:55:06.904Z",…}
// categoryId: "5b825cda4892087d4b0bac95"
// cityId: "5b825cda4892087d4b0bac87"
// cover: "m1.jpg"
// covers: []
// description: "bla bla bla bla bla bla bla bla bla "
// id: "5b825cda4892087d4b0bac9c"
// locationId: "5b825cda4892087d4b0bac8c"
// locationPoint: {lat: 33.513868529321854, lng: 36.276908884156455}
// logo: "logo.png"
// nameAr: "bla bla"
// nameEn: "name"
// nameUnique: "bla"
// openingDays: [1, 2, 5]
// openingDaysEnabled: true
// owner: {status: "activated", birthDate: "1991-08-26T14:46:27.146Z",…}
// ownerId: "5b8314c11960747e2397f95e"
// products: [{name: "name1", price: 100, image: "m1.jpg", description: null, id: 1, order: 1},…]
// status: "activated"
// subCategory: {code: "default", titleAr: "كافتريات", titleEn: "caffe", creationDate: "2018-08-26T07:55:06.912Z",…}
// subCategoryId: "5b825cda4892087d4b0bac99"
