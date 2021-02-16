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



  id;
  skip: number = 0;
  data: any = {};
  title: String = '';
  categories: any[];
  cities: any[];
  city;
  category;
  cityId = '';
  categoryId = '';
  initialValue;
  subCategory = "";
  location = "";
  searchText: string = '';
  count = 0;

  constructor(private rs: RequestsService, private ts: TranslateService,
    public cds: CommonDataService, private route: ActivatedRoute, private router: Router) { }

  async ngOnInit() {

    this.categories = await this.cds.categoriesPromise;
    this.cities = await this.cds.citiesPromise;

    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      if (params['skip'])
        this.skip = +params['skip'];
      this.setFilter(params);
      this.applyFilter();
      this.getVolumeData(0)
    })
  }



  applyFilter() {
    this.cds.filterItem['categoryId'] = this.categoryId;
    this.cds.filterItem['subCatId'] = this.subCategory;
    this.cds.filterItem['cityId'] = this.cityId;
    this.cds.filterItem['locationId'] = this.location;
    this.cds.filterItem['keywords'] = this.searchText;
  }

  volumeFilter() {
    this.applyFilter();
  }

  setFilter(params) {
    let { keywords, categoryId, subCatId, cityId, locationId } = params;
    this.searchText = keywords;

    if (subCatId) {
      this.subCategory = subCatId;
    }
    this.category = this.categories.find(e => e.id == categoryId);
    this.setCategoryId(this.category);
    if (locationId) {
      this.location = locationId;
    }
    this.city = this.cities.find(e => e.id == cityId);
    this.setCityId(this.city);
  }


  getVolumeData(num: number) {

    var params: any = {
      "filter[limit]": "1",
      "filter[skip]": (num + this.skip).toString(),
      "filter[order]": "creationDate DESC",
      "filter[where][status]": "activated"
    }

    if (this.id) {
      params = { where: { id: this.id } };
    }
    this.rs.getWithHeaders('volumes', params)
      .subscribe(({ body: res, headers }) => {

        let count = +headers.get('X-Total-Count');
        if (count) this.count = count;

        if (res[0] != undefined) {
          this.data = res[0];
          this.data.posts = this.data.posts.filter(e => { return e.status == 'activated' });
          this.title = this.data['titleEn'];
          if (this.ts.currentLang == 'ar') {
            this.title = this.data['titleAr']
          }
          this.skip = this.skip + num;
        }
      });
  }

  next() {
    if (this.nextDisabled) return;
    this.getVolumeData(-1);
  }

  prev() {
    if (this.prevDisabled) return;
    this.getVolumeData(1);
  }

  get nextDisabled() {
    return this.skip == 0;
  }

  get prevDisabled() {
    return this.skip + 1 == this.count;
  }

  setCityId(c) {
    if (c != undefined) {
      this.cityId = c['id'];
    } else {
      this.cityId = '';
      this.location = '';
    }
  }

  setCategoryId(c) {
    if (c != undefined) {
      this.categoryId = c['id'];
    } else {
      this.categoryId = '';
      this.subCategory = '';
    }
  }



}
