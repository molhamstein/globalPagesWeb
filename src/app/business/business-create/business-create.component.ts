import { Component, OnInit } from '@angular/core';
import {RequestsService} from '../../requests.service';
import {TranslateService} from '@ngx-translate/core';
import {HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-business-create',
  templateUrl: './business-create.component.html',
  styleUrls: ['./business-create.component.css']
})
export class BusinessCreateComponent implements OnInit {

  constructor(private api:RequestsService,private translteService:TranslateService,private router:Router) { }
  categories
  subCategories
  selectedCategory
  lang
  cities
  selectedCity
  locations
  ngOnInit() {
    this.lang=this.translteService.currentLang

    var p=new HttpParams();
    p=p.set('filter',JSON.stringify({
      "where":{"parentCategoryId" : {"exists" : false}},
      "include":"subCategories"
    }));
    this.translteService.onLangChange.subscribe(()=>{
      this.lang=this.translteService.currentLang
    })
    this.api.get('businessCategories',p).toPromise().then(data=>{
      this.categories=data
    })
    this.api.get('cities').toPromise().then(data=>{
      this.cities=data
    })
    this.api.get('locations').toPromise().then(data=>{
      this.locations=data
    })
  }
  submit(data){
    const user = JSON.parse(localStorage.getItem(environment.userDetails));
    data['ownerId']=user['userId'];
    let images=new FormData();
    if(this.files && this.files.length>0){
      for (let i = 0; i < this.files.length; i++) {
        images.append('file', this.files[i]);
      }
      this.api.post('attachments/images/upload', images).subscribe(res => {
            data['media']=res
            this.api.post('businesses',data).subscribe(data=>{
               this.router.navigate(['business',data['id']])
            })
          })
    }
    else
      this.api.post('businesses',data).subscribe(data=>{
            this.router.navigate(['business',data['id']])
          })



  }
  files
  onFileAdded(files){
    this.files=files
  }
  onCategoryChange(){
    this.api.get('businessCategories/'+this.selectedCategory+'/subCategories').toPromise().then(data=>{
      this.subCategories=data
    })
  }
  cityChanged(){
    var p=new HttpParams()
    p=p.set('filter',JSON.stringify({
      where:{
        cityId:this.selectedCity
      }
    }))
    this.api.get('locations',p).toPromise().then(data=>{
      this.locations=data
    })
  }

}
