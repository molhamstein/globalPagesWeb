import { Component, OnInit } from '@angular/core';
import { CommonDataService } from 'src/app/common-data.service';
import { RequestsService } from 'src/app/requests.service';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css']
})
export class GuideComponent implements OnInit {
  bCategories:Object[];
  cities:Object[];
  posts:Object[];

  location:string = "0";
  categoryID:string ="0";
  constructor(private cds:CommonDataService,private requests: RequestsService) { }

  ngOnInit() {
    this.cds.citiesPromise.then(res => this.cities = <Object[]>res);
    this.cds.bCategoryPromise.then(res => this.bCategories = <Object[]>res);
    this.requests.get('businesses').subscribe(res=>{
      this.posts = <Object[]>res;
      console.warn(this.posts)
    })
  }
// ?filter[where][categoryId] = 5b825cda4892087d4b0bac95
}
