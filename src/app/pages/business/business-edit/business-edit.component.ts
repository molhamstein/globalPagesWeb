import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { latLng } from 'leaflet';
import { forkJoin, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RequestsService } from '../../../services/requests.service';
@Component({
  selector: 'app-business-edit',
  templateUrl: './business-edit.component.html',
  styleUrls: ['./business-edit.component.css']
})
export class BusinessEditComponent implements OnInit {
  constructor(private api: RequestsService, private translteService: TranslateService,
    private router: Router, private route: ActivatedRoute) { }

  @ViewChild('form', { static: false }) form;
  categories;
  subCategories;
  selectedCategory;
  lang;
  cities;
  countries;
  selectedCity;
  selectedCountry;
  locations;
  locationId;
  subCategoryId;
  id;
  business: any = {};
  files;


  ngOnInit() {
    // get data if there is an id
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (!this.id) return;
      var p = new HttpParams();
      p = p.set('filter', JSON.stringify({
        "where": {
          "or": [{ "nameUnique": this.id }, { "id": this.id }]
        },
        "include": "subCategory"
      }));
      this.api.get('businesses', p).subscribe((data) => {
        this.business = data[0];
        this.business.locationPoint = latLng(this.business.locationPoint);
        this.cityChanged();
        this.onCategoryChange();
      });
    });

    this.lang = this.translteService.currentLang;
    this.translteService.onLangChange.subscribe(() => {
      this.lang = this.translteService.currentLang;
    });

    var p = new HttpParams();
    p = p.set('filter', JSON.stringify({
      "where": { "parentCategoryId": { "exists": false } },
      "include": "subCategories"
    }));

    this.api.get('businessCategories', p).toPromise().then(data => {
      this.categories = data;
      this.onCategoryChange();
    });

    this.api.get('countries').toPromise().then(data => {
      this.countries = data;
    });
  }

  onFileAdded(files) {
    this.files = files;
  }

  onSupplierChange() {
    let p = new HttpParams();
    p = p.set('filter', JSON.stringify({
      "where": {
        "parentCategoryId": { "inq": [null] },
        "supplier": this.business['supplier']
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
        "supplier": this.business['supplier'],
      },
    }));
    this.api.get('businessCategories', p).toPromise().then(data => {
      this.subCategories = data;
    });
  }

  countryChanged() {
    var p = new HttpParams();
    p = p.set('filter', JSON.stringify({
      where: {
        countryId: this.selectedCountry
      }
    }));
    this.cities = [];
    this.api.get('cities', p).toPromise().then(data => {
      this.cities = data;
    });
  }

  cityChanged() {
    var p = new HttpParams();
    p = p.set('filter', JSON.stringify({
      where: {
        cityId: this.business['cityId']
      }
    }));
    this.locations = [];
    this.api.get('locations', p).toPromise().then(data => {
      this.locations = data;
    });
  }

  submit(data) {
    if (this.form.invalid) return;
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

      forkJoin([imageObservable, videoObservable]).subscribe((res: any) => {
        let covers = [];
        if (res[0])
          covers = covers.concat(res[0]);
        if (res[1])
          covers = covers.concat(res[1]);

        this.business['covers'] = this.business['covers'] || [];
        data['covers'] = covers.concat(this.business['covers']);
        data = Object.assign(this.business, data);
        this.api.put('businesses/' + this.id, data).subscribe(data => {
          this.router.navigate(['business', data['id']]);
        });
      })
    }
    else {
      data = Object.assign(this.business, data);
      this.api.put('businesses', data).subscribe(data => {
        this.router.navigate(['business', data['id']]);
      });
    }
  }

}
