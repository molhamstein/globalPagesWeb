import { Component, OnInit, ComponentFactoryResolver, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonDataService } from 'src/app/common-data.service';
import { RequestsService } from 'src/app/requests.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  bCategories: Object[];
  cities: Object[];
  posts: Object[];
  menuPosts: Object[];

  skip: number = 0;
  city;
  isSelected;
  initialValue;
  category;
  cityId = "";
  location = "";
  categoryId = "";
  subCategory = "";
  title = "";
  params: Object = {};
  nextDisabled = true;
  prevDisabled = false;

  constructor(private ts: TranslateService, private cds: CommonDataService,
    private requests: RequestsService, private resolver: ComponentFactoryResolver,
    private injector: Injector, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const filter = this.getQueryParams();
    this.cds.citiesPromise.then(res => this.cities = <Object[]>res);
    this.cds.productCategoryPromise.then(res => this.bCategories = <Object[]>res);
    this.getPostsData(filter);
  }

  getQueryParams() {
    let params = this.route.snapshot.queryParams;
    let filter: Object = {};
    if (params.title && params.title.trim().length != 0) {
      filter['filter[where][or][0][titleEn][like]'] = params.title;
      filter['filter[where][or][1][titleAr][like]'] = params.title;
      filter['filter[where][or][0][titleEn][options]'] = "i";
      filter['filter[where][or][1][titleAr][options]'] = "i";
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

  addQueryParams(param: object) {
    this.router.navigate([], {
      queryParams: { ...param },
    });
  }

  reFilter() {

    this.addQueryParams({
      title: this.title,
      cityId: this.cityId,
      location: this.location,
      categoryId: this.categoryId,
      subCategory: this.subCategory
    });

    if (this.title == "" || this.title.trim().length == 0) {
      delete this.params['filter[where][or][0][titleEn][like]'];
      delete this.params['filter[where][or][1][titleAr][like]'];
      delete this.params['filter[where][or][0][titleEn][options]'];
      delete this.params['filter[where][or][1][titleAr][options]'];
    } else {
      this.params['filter[where][or][0][titleEn][like]'] = this.title;
      this.params['filter[where][or][1][titleAr][like]'] = this.title;
      this.params['filter[where][or][0][titleEn][options]'] = "i";
      this.params['filter[where][or][1][titleAr][options]'] = "i";
    }

    if (this.cityId == "") {
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
    params['filter[order]'] = "creationDate DESC"
    this.requests.get('marketProducts', params).subscribe(res => {
      this.posts = <Object[]>res;

      this.menuPosts = this.posts;
      if (this.posts.length == 0) {
        this.prevDisabled = true;
        if (this.skip == 0) {
          this.nextDisabled = true;
        }
      }
    })
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
