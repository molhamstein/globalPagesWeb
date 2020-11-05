import { Component, OnInit } from '@angular/core';
import { CommonDataService } from '../../common-data.service';
import { RequestsService } from '../../requests.service';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
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
  filesToUpload;
  videosToUpload;

  constructor(private cds: CommonDataService, private rs: RequestsService, private router: Router) { }

  ngOnInit() {
    this.cds.categoriesPromise.then(res => this.categories = <Object[]>res);
    this.cds.citiesPromise.then(res => this.cities = <Object[]>res)
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
      "viewsCount": 0,
      "isFeatured": true,
      "ownerId": user['userId'],
      "categoryId": this.category['id'],
      "subCategoryId": this.subCategory['id'],
      "cityId": this.city['id'],
      "locationId": this.location['id'],
      "media": []
    };

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
            this.rs.post('posts', postData, h)
              .subscribe(res => {
                this.router.navigate(['/ad', res['id']])
              });
          });
        }
        else {
          postData.media = <any[]>res;
          this.rs.post('posts', postData, h).subscribe(res => {
            this.router.navigate(['/ad', res['id']])
          });
        }
      });
    }
    else {
      if (vidoeCnt) {
        this.rs.post('attachments/videos/upload', videos).subscribe((res: any[]) => {
          postData.media = <any[]>res;
          this.rs.post('posts', postData, h)
            .subscribe(res => {
              this.router.navigate(['/ad', res['id']])
            });
        });
      }
      else {
        this.rs.post('posts', postData, h).subscribe(res => {
          this.router.navigate(['/ad', res['id']])
        });
      }
    }




  }
}
