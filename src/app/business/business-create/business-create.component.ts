import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestsService } from '../../requests.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-business-create',
  templateUrl: './business-create.component.html',
  styleUrls: ['./business-create.component.css']
})
export class BusinessCreateComponent implements OnInit {

  constructor(private api: RequestsService, private translteService: TranslateService,
    private router: Router, private spinner: NgxSpinnerService) { }

  @ViewChild('form', { static: false }) form;
  categories;
  subCategories;
  selectedCategory;
  lang;
  cities;
  selectedCity;
  locations;
  locationId;
  subCategoryId;
  isSupplier: boolean = false;
  files;

  ngOnInit() {
    this.lang = this.translteService.currentLang;

    this.translteService.onLangChange.subscribe(() => {
      this.lang = this.translteService.currentLang;
    });

    let p = new HttpParams();
    p = p.set('filter', JSON.stringify({
      "where": { "parentCategoryId": { "exists": false } },
      "include": "subCategories"
    }));

    this.api.get('businessCategories', p).toPromise().then(data => {
      this.categories = data;
    });

    this.api.get('cities').toPromise().then(data => {
      this.cities = data;
    });

  }

  onSupplierChange() {
    let p = new HttpParams();
    p = p.set('filter', JSON.stringify({
      "where": {
        "parentCategoryId": {"inq":[null]},
        "supplier": this.isSupplier
      },
    }));

    this.api.get('businessCategories', p).toPromise().then(data => {
      this.categories = data;
    });
  }

  onCategoryChange() {
    let p = new HttpParams();
    p = p.set('filter', JSON.stringify({
      "where": {
        "parentCategoryId": this.categories[this.selectedCategory]['id'],
        "supplier": this.isSupplier,
      },
    }));
    this.api.get('businessCategories', p).toPromise().then(data => {
      this.subCategories = data;
    });
  }

  cityChanged() {
    this.locationId = null;

    let p = new HttpParams();
    p = p.set('filter', JSON.stringify({
      where: { cityId: this.selectedCity }
    }));

    this.locations = []
    this.api.get('locations', p).toPromise().then(data => {
      this.locations = data
    });
  }

  submit(data) {
    if (this.form.invalid) return;

    this.spinner.show();
    data['categoryId'] = this.categories[this.selectedCategory]['id']
    const user = JSON.parse(localStorage.getItem(environment.userDetails));
    data['ownerId'] = user['userId'];
    let images: FormData = new FormData();
    let videos = new FormData();
    if (this.files && this.files.length > 0) {
      for (let i = 0; i < this.files.length; i++) {
        if (this.files[i]['preview'])
          images.append('file', this.files[i].file);
        else
          videos.append('file', this.files[i].file);
      }
      let imageObservable = this.api.post('attachments/images/upload', images);
      let videoObservable = this.api.post('attachments/videos/upload', videos);

      if (images.getAll('file').length == 0)
        imageObservable = of(undefined);
      if (videos.getAll('file').length == 0)
        videoObservable = of(undefined);

      forkJoin([imageObservable, videoObservable]).subscribe(res => {
        let covers = [];
        if (res[0])
          covers = covers.concat(res[0])
        if (res[1])
          covers = covers.concat(res[1])
        data['covers'] = covers;

        this.api.post('businesses', data).subscribe(data => {
          this.spinner.hide();
          this.router.navigate(['business', data['id']])
        })
      })
    }
    else {
      this.api.post('businesses', data).subscribe(data => {
        this.spinner.hide();
        this.router.navigate(['business', data['id']]);
      });
    }
  }

}
