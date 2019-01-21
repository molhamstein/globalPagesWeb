import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RequestsService} from '../../requests.service';
import {TranslateService} from '@ngx-translate/core';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-business-view',
  templateUrl: './business-view.component.html',
  styleUrls: ['./business-view.component.css']
})
export class BusinessViewComponent implements OnInit {

  constructor(private route:ActivatedRoute,private api:RequestsService,private translteService:TranslateService) { }
  lang
  id
  business
  ngOnInit() {
    this.lang=this.translteService.currentLang
    this.translteService.onLangChange.subscribe(()=>{
      this.lang=this.translteService.currentLang
    })
    this.route.params.subscribe((params)=>{
      this.id=params['id']
      var p=new HttpParams();
      p=p.set('filter',JSON.stringify({
        "where":{
          "or":[{"nameUnique" : this.id},{"id" : this.id}]}
      }));
      this.api.get('businesses',p).subscribe((data)=>{
        this.business=data[0]
      })
    })
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
