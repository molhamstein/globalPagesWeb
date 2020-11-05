import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommonDataService } from '../../common-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { RequestsService } from '../../requests.service';
import { ImageItem, VideoItem } from '@ngx-gallery/core';
import { Promise, all } from 'q';

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
  filesToUpload;
  media
  adData
  constructor(private cds: CommonDataService, private rs: RequestsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.cds.categoriesPromise.then(res => this.categories = <any[]>res);
    this.cds.citiesPromise.then(res => this.cities = <any[]>res)
    all([this.cds.categoriesPromise, this.cds.citiesPromise]).then((data) => {
      this.route.data.subscribe(({ adData }) => {
        this.adData = adData
        this.name = this.adData['title'];
        this.details = this.adData['description'];
        this.category = this.categories.find((v) => v.id == this.adData['categoryId']);
        this.city = this.cities.find((v) => v.id == this.adData['cityId']);
        this.location = this.city.locations.find((v) => v.id == this.adData['locationId']);
        this.subCategory = this.category.subCategories.find((v) => v.id == this.adData['subCategoryId']);
        this.media = this.adData['media'];

      })
    })
  }

  registerAd() {
    const user = JSON.parse(localStorage.getItem(environment.userDetails));

    let images: FormData = new FormData();
    let videos: FormData = new FormData();

    let imageCnt = 0;
    let vidoeCnt = 0;

    for (let i = 0; i < this.filesToUpload.length; i++) {
      console.log(this.filesToUpload[i].file.type);
      if (this.filesToUpload[i].file.type !== 'video/mp4')
        images.append('file', this.filesToUpload[i].file), imageCnt += 1;
      else
        videos.append('file', this.filesToUpload[i].file), vidoeCnt += 1;
    }

    var postData: any = {
      "title": this.name,
      "description": this.details,
      "ownerId": user['userId'],
      "categoryId": this.category['id'],
      "subCategoryId": this.subCategory['id'],
      "cityId": this.city['id'],
      "locationId": this.location['id'],
      "media": this.media
    };
    postData = Object.assign(this.adData, postData);
    let id = postData.id;
    delete postData.id
    let h = new HttpHeaders();
    h = h.append('Authorization', user['id']);
    h = h.append('Content-Type', 'application/json');

    if (imageCnt) {
      this.rs.post('attachments/images/upload', images).subscribe((res: any[]) => {
        if (vidoeCnt) {
          this.rs.post('attachments/videos/upload', videos).subscribe((res_video: any[]) => {
            let media = res.concat(res_video);
            console.log(media);
            postData.media = media;
            this.rs.put('posts/' + id, postData, h).subscribe(res => {
              this.router.navigate(['/ad', res['id']]);
            });
          });
        }
        else {
          postData.media = <any[]>res;
          this.rs.put('posts/' + id, postData, h).subscribe(res => {
            this.router.navigate(['/ad', res['id']]);
          });
        }
      });
    }
    else {
      if (vidoeCnt) {
        this.rs.post('attachments/videos/upload', videos).subscribe((res: any[]) => {
          postData.media = <any[]>res;
          this.rs.put('posts/' + id, postData, h).subscribe(res => {
            this.router.navigate(['/ad', res['id']]);
          });
        });
      }
      else {
        this.rs.put('posts/' + id, postData, h).subscribe(res => {
          this.router.navigate(['/ad', res['id']]);
        });
      }
    }

  }

}


