import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CommonDataService } from '../../../services/common-data.service';
import { RequestsService } from '../../../services/requests.service';
@Component({
  selector: 'app-ad-create',
  templateUrl: './ad-create.component.html',
  styleUrls: ['./ad-create.component.css']
})
export class AdCreateComponent implements OnInit {
  categories: any[];
  cities: any[];
  countries: any[];
  name: any;
  city: any;
  country: any;
  location: any;
  category: any;
  subCategory: any;
  details: any;
  filesToUpload;
  videosToUpload;

  constructor(private cds: CommonDataService, private rs: RequestsService, private router: Router) { }

  ngOnInit() {
    this.cds.adCategories.then(res => this.categories = res);
    this.cds.countriesPromise.then(res => this.countries = res);
  }


  onChoseCountry() {
    this.cds.getCities(this.country.id).then(res => this.cities = res);
  }

  registerAd() {
    const user = JSON.parse(localStorage.getItem(environment.userDetails));

    let images: FormData = new FormData();
    let videos: FormData = new FormData();

    let imageCnt = 0;
    let vidoeCnt = 0;

    for (let i = 0; i < this.filesToUpload.length; i++) {
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
      "countryId": this.country['id'],
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
