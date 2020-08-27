import { Component, OnInit } from '@angular/core';
import { CommonDataService } from 'src/app/common-data.service';
import { RequestsService } from 'src/app/requests.service';
import { latLng, tileLayer } from 'leaflet';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {
  map;
  markers: any[] = [];
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    ],
    zoom: 13,
    maxZoom: 15,
    minZoom: 11,
    center: latLng(33.5102, 36.29128)
  };

  bCategories: Object[];
  cities: Object[];
  posts: Object[];
  menuPosts: Object[];

  city;
  category;
  initialValue;
  skip: number = 0;
  cityId = "";
  location = "";
  categoryId = "";
  subCategory = "";
  title = "";
  params: Object = {};
  nextDisabled = true;
  prevDisabled = false;

  constructor(private ts: TranslateService, private cds: CommonDataService,
    private requests: RequestsService) { }

  ngOnInit() {
    this.cds.citiesPromise.then(res => this.cities = <Object[]>res);
    this.cds.bCategoryPromise.then(res => this.bCategories = <Object[]>res);
    this.getPostsData({});
  }

  ngDoCheck() {
    // since our components are dynamic, we need to manually iterate over them and trigger
    // change detection on them.
    this.markers.forEach(entry => {
      entry.componentInstance.changeDetectorRef.detectChanges();
    })
  }

  onMapReady(map) {
    this.map = map;
  }

  reFilter() {

    if (this.title == "" || this.title.trim().length == 0) {
      delete this.params['filter[where][or][0][nameEn][like]'];
      delete this.params['filter[where][or][1][nameAr][like]'];
      delete this.params['filter[where][or][0][nameEn][options]'];
      delete this.params['filter[where][or][1][nameAr][options]'];
    }
     else {
      this.params['filter[where][or][0][nameEn][like]'] = this.title;
      this.params['filter[where][or][1][nameAr][like]'] = this.title;
      this.params['filter[where][or][0][nameEn][options]'] = "i";
      this.params['filter[where][or][1][nameAr][options]'] = "i";
    }

    if (this.cityId == "") {
      delete this.params["filter[where][cityId]"]
    } 
    else {
      this.params["filter[where][cityId]"] = this.cityId;
    }
    if (this.location == "") {
      delete this.params["filter[where][locationId]"]
    } 
    else {
      this.params["filter[where][locationId]"] = this.location;
    }
    if (this.categoryId == "") {
      delete this.params["filter[where][categoryId]"]
    } 
    else {
      this.params["filter[where][categoryId]"] = this.categoryId;
    }
    if (this.subCategory == "") {
      delete this.params["filter[where][subCategoryId]"]
    } 
    else {
      this.params["filter[where][subCategoryId]"] = this.subCategory;
    }

    this.getPostsData(this.params);
  }


  getPostsData(params) {
    params['filter[where][supplier]'] = true;
    params['filter[where][status]'] = "activated";
    params['filter[limit]'] = "20";


    params['filter[skip]'] = (20 * this.skip).toString();
    this.requests.get('businesses', params).subscribe(res => {
      this.posts = <Object[]>res;

      this.menuPosts = this.posts;
      if (this.posts.length == 0) {
        this.prevDisabled = true;
        if (this.skip == 0) {
          this.nextDisabled = true;
        }
      }
    });
  }

  setCityId(c) {
    if (c != undefined) {
      this.cityId = c['id'];
    }
  }

  setCategoryId(c) {
    if (c != undefined) {
      this.categoryId = c['id'];
    }
  }

  prev() {
    this.nextDisabled = false;
    this.skip += 1;
    this.reFilter()
  }

  next() {
    if (this.skip > 0) {
      if (this.skip <= 1) {
        this.nextDisabled = true;
      }
      this.skip -= 1;
      this.reFilter();
      this.prevDisabled = false;
    }
  }
}
