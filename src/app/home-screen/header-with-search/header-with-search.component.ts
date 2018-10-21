import { Component, OnInit, Input } from '@angular/core';
import { CommonDataService } from '../../common-data.service';

@Component({
  selector: 'app-header-with-search',
  templateUrl: './header-with-search.component.html',
  styleUrls: ['./header-with-search.component.css']
})
export class HeaderWithSearchComponent implements OnInit {
  // @Input()categories:Object[];
  categories :Object[];
  constructor(private cds: CommonDataService) { }

  filterBy(item:Object){
    this.categories.unshift('s')
    console.warn(this.categories)
  }

  ngOnInit() {
  
    this.cds.categoriesObservable.subscribe(res => this.categories = <Object[]>res)
    
  }

}
