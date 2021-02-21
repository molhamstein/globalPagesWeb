import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonDataService } from 'src/app/services/common-data.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  categories: any[];
  countries: any[];
  cities: any[];
  products: any[];

  country: any;
  countryId = "";
  city: any;
  cityId = "";
  location = "";

  category: any;
  categoryId = "";
  subCategory = "";

  title = "";
  params: Object = {};

  skip: number = 0;
  nextDisabled = true;
  prevDisabled = false;

  constructor(
    private cds: CommonDataService,
    private requests: RequestsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const filter = this.getQueryParams();
    this.cds.countriesPromise.then(res => this.countries = <Object[]>res);
    this.cds.productCategories.then(res => this.categories = <Object[]>res);
    this.getPostsData(filter);
  }

  addQueryParams(param: object) {
    this.router.navigate([], {
      queryParams: { ...param },
    });
  }

  getQueryParams() {
    let params = this.route.snapshot.queryParams;
    let filter: Object = {};
    if (params.title && params.title.trim().length != 0) {
      filter['filter[where][or][0][nameEn][like]'] = params.title;
      filter['filter[where][or][1][nameAr][like]'] = params.title;
      filter['filter[where][or][0][nameEn][options]'] = "i";
      filter['filter[where][or][1][nameAr][options]'] = "i";
    }
    if (params.countryId) {
      filter["filter[where][countryId]"] = params.countryId;
    }
    if (params.cityId) {
      filter["filter[where][cityId]"] = params.cityId;
    }
    if (params.location) {
      filter["filter[where][locationId]"] = params.location;
    }
    if (params.categoryId) {
      filter["filter[where][categoryId]"] = params.categoryId;
    }
    if (params.subCategory) {
      filter["filter[where][subCategoryId]"] = params.subCategory;
    }
    return filter;
  }

  reFilter() {

    this.addQueryParams({
      title: this.title,
      countryId: this.countryId,
      cityId: this.cityId,
      location: this.location,
      categoryId: this.categoryId,
      subCategory: this.subCategory
    });

    if (this.title == "" || this.title.trim().length == 0) {
      delete this.params['filter[where][or][0][nameEn][like]'];
      delete this.params['filter[where][or][1][nameAr][like]'];
      delete this.params['filter[where][or][0][nameEn][options]'];
      delete this.params['filter[where][or][1][nameAr][options]'];
    } else {
      this.params['filter[where][or][0][nameEn][like]'] = this.title;
      this.params['filter[where][or][1][nameAr][like]'] = this.title;
      this.params['filter[where][or][0][nameEn][options]'] = "i";
      this.params['filter[where][or][1][nameAr][options]'] = "i";
    }

    if (this.countryId == undefined) {
      delete this.params["filter[where][countryId]"]
    } else {
      this.params["filter[where][countryId]"] = this.countryId;
    }
    if (this.cityId == undefined) {
      delete this.params["filter[where][cityId]"]
    } else {
      this.params["filter[where][cityId]"] = this.cityId;
    }
    if (this.location == "") {
      delete this.params["filter[where][locationId]"]
    } else {
      this.params["filter[where][locationId]"] = this.location;
    }
    if (this.categoryId == "") {
      delete this.params["filter[where][categoryId]"]
    } else {
      this.params["filter[where][categoryId]"] = this.categoryId;
    }
    if (this.subCategory == "") {
      delete this.params["filter[where][subCategoryId]"]
    } else {
      this.params["filter[where][subCategoryId]"] = this.subCategory;
    }

    this.getPostsData(this.params);
  }

  getPostsData(params) {

    params['filter[where][status]'] = "activated";
    params['filter[limit]'] = "20";
    params['filter[skip]'] = (20 * this.skip).toString();
    params['filter[order]'] = "creationDate DESC";

    this.requests.get('marketProducts', params).subscribe(res => {
      this.products = <Object[]>res;
      if (this.products.length == 0) {
        this.prevDisabled = true;
        if (this.skip == 0) {
          this.nextDisabled = true;
        }
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
