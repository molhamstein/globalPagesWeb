import { Component, OnInit } from '@angular/core';
import { CommonDataService } from '../../common-data.service';
import { RequestsService } from '../../requests.service';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-ad-create',
  templateUrl: './ad-create.component.html',
  styleUrls: ['./ad-create.component.css']
})
export class AdCreateComponent implements OnInit {
  categories: Object[];
  cities: Object[];
  name: any;
  city: any;
  location: any;
  category: any;
  subCategory: any;
  details: any;
  filesToUpload: Array<File> = [];
  constructor(private cds: CommonDataService, private rs: RequestsService) { }

  ngOnInit() {
    this.cds.categoriesPromise.then(res => this.categories = <Object[]>res);
    this.cds.citiesPromise.then(res => this.cities = <Object[]>res)

  }

  onSelectFile(evt) {
    this.filesToUpload = <Array<File>>evt.target.files;
  }
  registerAd() {
    const user = JSON.parse(localStorage.getItem(environment.userDetails));
    // console.warn('user',user)
    var images: any = new FormData();
    var postData: any = {
      "title": this.name,
      "description":this.details,
      "viewsCount":0,
      "isFeatured":true,
      "ownerId":user['userId'],
      "categoryId":this.category['id'],
      "subCategoryId":this.subCategory['id'],
      "cityId":this.city['id'],
      "locationId":this.location['id'],
      "media":''
    };
    for (let i = 0; i < this.filesToUpload.length; i++) {
      images.append('file', this.filesToUpload[i]);
    }
  
    let h = new HttpHeaders();
    h=h.append('Authorization', user['id']);
    h=h.append('Content-Type', 'application/json');
    // console.warn(images);
    this.rs.post('attachments/images/upload', images)
      .subscribe(res => {
        console.warn(res);
        // this.filesLinks = <any[]>res;
        postData.media = <any[]>res;
        this.rs.post('posts', postData,h)
          .subscribe(res => {
            console.warn('res2', res);
            alert("Done!")
          })
        // console.warn(this.filesLinks);
      })
    console.warn( this.name , this.city,this.location,this.category,this.subCategory,this.details);
  }
}
