import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {CommonDataService} from '../../common-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpHeaders} from '@angular/common/http';
import {RequestsService} from '../../requests.service';
import {ImageItem, VideoItem} from '@ngx-gallery/core';
import {Promise,all} from 'q';

@Component({
  selector: 'app-ad-edit',
  templateUrl: './ad-edit.component.html',
  styleUrls: ['./ad-edit.component.css']
})
export class AdEditComponent implements OnInit {

  categories: any[];
  cities: any[];
  name: any;
  city: any;
  location: any;
  category: any;
  subCategory: any;
  details: any;
  filesToUpload ;
  media
  adData
  constructor(private cds: CommonDataService, private rs: RequestsService, private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.cds.categoriesPromise.then(res => this.categories = <any[]>res);
    this.cds.citiesPromise.then(res => this.cities = <any[]>res)
    all([this.cds.categoriesPromise,this.cds.citiesPromise]).then((data)=>{
      this.route.data.subscribe(({adData}) =>{
        this.adData=adData
        this.name=this.adData['title'];
        this.details=this.adData['description'];
        this.category=this.categories.find((v)=>v.id==this.adData['categoryId']);
        this.city=this.cities.find((v)=>v.id==this.adData['cityId']);
        this.location=this.city.locations.find((v)=>v.id==this.adData['locationId']);
        this.subCategory=this.category.subCategories.find((v)=>v.id==this.adData['subCategoryId']);
        this.media=this.adData['media'];

      })
    })


  }

  // onSelectFile() {
  //   console.warn(this.filesToUpload );
  // }
  registerAd() {
    const user = JSON.parse(localStorage.getItem(environment.userDetails));
    // console.warn('user',user)
    var images:FormData = new FormData();
    // console.warn(this.filesToUpload);
    for (let i = 0; i < this.filesToUpload.length; i++) {
      images.append('file', this.filesToUpload[i].file);
    }

    // console.warn(images.getAll('file'));
    var postData: any = {
      "title": this.name,
      "description":this.details,
      "ownerId":user['userId'],
      "categoryId":this.category['id'],
      "subCategoryId":this.subCategory['id'],
      "cityId":this.city['id'],
      "locationId":this.location['id'],
      "media":this.media
    };
    postData=Object.assign(this.adData,postData);
    delete postData.id
    let h = new HttpHeaders();
    h=h.append('Authorization', user['id']);
    h=h.append('Content-Type', 'application/json');
    this.rs.post('attachments/images/upload', images)
      .subscribe(res => {
        // console.warn(res);
        // this.filesLinks = <any[]>res;
        postData.media=postData.media||[];
        postData.media=postData.media.concat(res);
        this.rs.post('posts', postData,h)
          .subscribe(res => {
            this.router.navigate(['/ad', res['id']])
            // console.warn('res2', res);
            // alert("Done!")
          })
        // console.warn(this.filesLinks);
      })
    // console.warn( this.name , this.city,this.location,this.category,this.subCategory,this.details);
  }

}
