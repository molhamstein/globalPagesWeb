import { Component, OnInit, Input } from '@angular/core';
import { RequestsService } from '../../requests.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonDataService } from '../../common-data.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { HeaderWithSearchComponent} from '../header-with-search/header-with-search.component';
@Component({
  selector: 'app-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.css']
})
export class VolumeComponent implements OnInit {

  constructor(private rs: RequestsService, private ts: TranslateService, public cds: CommonDataService, private route: ActivatedRoute, private router: Router) {


  }
  id
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

  navigate() {
    this.router.navigate(["."], { queryParams: { ... this.cds.filterItem, skip: this.skip } });

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
    this.navigate();
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

  // @Input() categories:Object[];
  requesting: boolean = false;
  getVolumeData(num: number) {

    if (this.requesting) return;
    this.requesting = true;
    var params: any = {
      "filter[limit]": "1",
      "filter[skip]": (num + this.skip).toString(),
      "filter[order]": "creationDate DESC",
      "filter[where][status]": "activated"
    }



    if (this.id) {
      params = {
        where: {
          id: this.id
        }
      }
    }
    this.rs.getWithHeaders('volumes', params)
      .subscribe(({ body: res, headers }) => {


        let count = +headers.get('X-Total-Count');
        if (count)
          this.count = count;

        if (res[0] != undefined) {
          this.data = res[0];
          this.data.posts = this.data.posts.filter(e => { return e.status == 'activated' });
          this.title = this.data['titleEn']
          if (this.ts.currentLang == 'ar') {
            this.title = this.data['titleAr']
          }
          this.skip = this.skip + num;

          this.navigate();

        }
        this.requesting = false;

      })

  }

  next() {
    if (this.nextDisabled) return;
    this.getVolumeData(-1);

  }
  get nextDisabled() {
    return this.skip == 0;
  }
  get prevDisabled() {
    return this.skip + 1 == this.count;
  }
  prev() {

    if (this.prevDisabled) return;
    this.getVolumeData(1);
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

}
