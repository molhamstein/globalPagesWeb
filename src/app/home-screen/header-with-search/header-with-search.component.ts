import { Component, OnInit, Input } from '@angular/core';
import { CommonDataService } from '../../common-data.service';

@Component({
  selector: 'app-header-with-search',
  templateUrl: './header-with-search.component.html',
  styleUrls: ['./header-with-search.component.css']
})
export class HeaderWithSearchComponent implements OnInit {
  categories: Object[];
  cities: Object[];
  categoryID: string = "0"; // default place holder string
  adLocation: string = "0";
  searchText: string = "";
  selectedCategory;
  constructor(private cds: CommonDataService) { }


  filterByNavSearch() {
    this.cds.filterItem['categoryId'] = this.categoryID;
    this.cds.filterItem['cityId'] = this.adLocation['id'];
    this.cds.filterItem['keywords'] = this.searchText;
  }

  filterByIcon(item: Object) {
    // console.warn(item);
    if (item['id'] == this.cds.filterItem['categoryId']) {
      this.cds.filterItem['categoryId'] = '';
      this.selectedCategory = {};
      return;
    }
    this.selectedCategory = item;
    this.cds.filterItem['categoryId'] = item['id'];
  }

  ngOnInit() {

    // this.cds.categoriesObservable.subscribe(res => this.categories = <Object[]>res)
    this.cds.categoriesPromise.then(res =>  this.categories = <Object[]>res);
    this.cds.citiesPromise.then(res => this.cities = <Object[]>res)

  }

}
