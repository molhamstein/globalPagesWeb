import { Component, OnInit } from '@angular/core';
import {RequestsService} from '../../requests.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.css']
})
export class VolumeComponent implements OnInit {
 
  constructor(private rs:RequestsService, private ts: TranslateService) { }
  skip:number = 0;
  data: Object = {};
  title:String = '';

  getVolumeData(num:number){
    var params = {
      "filter[limit]":"1",
      "filter[skip]": (num+this.skip).toString()
    }
    this.rs.get('volumes',params)
    .subscribe(res =>{
      // console.warn(res[0]);
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
    this.getVolumeData(1);
  }
  
  ngOnInit() {
    this.getVolumeData(0)
    
  }

}
