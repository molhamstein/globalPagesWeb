import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonDataService } from '../../../services/common-data.service';
import { RequestsService } from '../../../services/requests.service';

@Component({
  selector: 'app-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.css']
})
export class VolumeComponent implements OnInit {

  id: string;
  categories: any[];
  countries: any[];
  cities: any[];
  ads: any = {};

  country: any;
  countryId = "";
  city: any;
  cityId = "";
  location = "";

  category: any;
  categoryId = "";
  subCategory = "";

  title = "";
  volumeTitle = "";

  filterObject: any;
  skip: number = 0;
  count: number = 0;

  constructor(
    private ts: TranslateService,
    private cds: CommonDataService,
    private requests: RequestsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getQueryParams();
    this.cds.countriesPromise.then(res => this.countries = <Object[]>res);
    this.cds.adCategories.then(res => this.categories = <Object[]>res);

    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      if (params['skip'])
        this.skip = +params['skip'];
      this.getPostsData(0);
    });
  }

  addQueryParams(param: object) {
    this.router.navigate([], {
      queryParams: { ...param },
    });
  }

  getQueryParams() {
    let params = this.route.snapshot.queryParams;
    this.filterObject = {
      title: params.title,
      countryId: params.countryId,
      cityId: params.cityId,
      location: params.location,
      categoryId: params.categoryId,
      subCategory: params.subCategory
    };
  }

  reFilter() {

    this.filterObject = {
      title: this.title,
      countryId: this.countryId,
      cityId: this.cityId,
      location: this.location,
      categoryId: this.categoryId,
      subCategory: this.subCategory
    };

    this.addQueryParams({ ...this.filterObject });
  }

  getPostsData(num) {

    let params: any = {};
    params['filter[where][status]'] = "activated";
    params['filter[limit]'] = "1";
    params['filter[skip]'] = (num + this.skip).toString();
    params['filter[order]'] = "creationDate DESC";

    if (this.id) {
      params['filter[where][id]'] = this.id;
    }

    this.requests.getWithHeaders('volumes', params)
      .subscribe(({ body: res, headers }) => {

        const count = +headers.get('X-Total-Count');
        if (count) this.count = count;

        if (res[0] != undefined) {
          this.ads = res[0];
          this.ads.posts = this.ads.posts.filter(e => { return e.status == 'activated' });
          this.volumeTitle = this.ts.currentLang == 'ar' ? this.ads['titleAr'] : this.ads['titleEn'];
          this.skip = this.skip + num;
        }
      });
  }

  setCountryId(c) {
    if (c != undefined) {
      this.countryId = c['id'];
      this.cds.getCities(this.countryId).then(res => this.cities = <Object[]>res);
    }
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

  next() {
    if (this.nextDisabled) return;
    this.getPostsData(-1);
  }

  prev() {
    if (this.prevDisabled) return;
    this.getPostsData(1);
  }

  get nextDisabled() {
    return this.skip == 0;
  }

  get prevDisabled() {
    return this.skip + 1 == this.count;
  }

}
