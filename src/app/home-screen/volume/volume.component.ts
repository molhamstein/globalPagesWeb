import { Component, OnInit,Input } from '@angular/core';
import {RequestsService} from '../../requests.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonDataService } from '../../common-data.service';
// import { HeaderWithSearchComponent} from '../header-with-search/header-with-search.component';
@Component({
  selector: 'app-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.css']
})
export class VolumeComponent implements OnInit {
 
  constructor(private rs:RequestsService, private ts: TranslateService,public cds: CommonDataService) { }
  skip:number = 0;
  data: any = {};
  title:String = '';
  categories:any[];
  cities:any[];

  category :any= '0';
  subCategory:any = '0';
  city:any='0';
  location:any ='0';
  searchText:string = '';

  volumeFilter(){
    this.cds.filterItem['categoryId'] = this.category['id'];
    this.cds.filterItem['subCatId'] = this.subCategory['id'];
    this.cds.filterItem['cityId']= this.city['id'];
    this.cds.filterItem['locationId'] = this.location['id'];
    this.cds.filterItem['keywords'] = this.searchText;
  }

  // @Input() categories:Object[];
  getVolumeData(num:number){
    var params = {
      "filter[limit]":"1",
      "filter[skip]": (num+this.skip).toString()
    }
    this.rs.get('volumes',params)
    .subscribe(res =>{
      if(res[0]!=undefined){
        this.data = res[0];
        this.title = this.data['titleEn']
        if (this.ts.currentLang=='ar'){
          this.title = this.data['titleAr']
        }
        this.skip = this.skip + num;
      }
    })

  }

  prev(){
    if (this.skip - 1 < 0)
      return;
    this.getVolumeData(-1);
    
  }
  
  next(){
    // console.warn(this.categories);
    this.getVolumeData(1);
  }
  
  ngOnInit() {
    this.getVolumeData(0)
    // this.cds.categoriesObservable.subscribe(res => this.categories =<Object[]> res);
    this.cds.categoriesPromise.then(res => this.categories =<Object[]> res);
    this.cds.citiesPromise.then(res => this.cities = <Object[]>res)
  }

}
