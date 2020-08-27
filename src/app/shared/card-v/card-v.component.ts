import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-card-v',
  templateUrl: './card-v.component.html',
  styleUrls: ['./card-v.component.css']
})
export class CardVComponent implements OnInit {
  @Input() details: any;
  data: any = {};
  constructor(private tr:TranslateService) { }

  ngOnInit() {
    if (this.details.hasOwnProperty('id'))
      this.data['id']= this.details['id'];

    if (this.details.hasOwnProperty('title'))
      this.data['title'] = this.details['title'];
      
    if (this.details.hasOwnProperty('description'))
      this.data['description'] = this.details['description'];
      
    if (this.details.hasOwnProperty('media') && this.details['media'].length > 0 && this.details['media']['0'].hasOwnProperty('url'))
      this.data['img'] = this.details['media']['0']['url'];
      
      if (this.tr.currentLang == 'ar') {
        if (this.details.hasOwnProperty('category') && this.details['category'].hasOwnProperty('titleAr'))
        this.data['category'] = this.details['category']['titleAr'];
        if (this.details.hasOwnProperty('subCategory') && this.details['subCategory'].hasOwnProperty('titleAr'))
        this.data['subCategory'] = this.details['subCategory']['titleAr'];
        if (this.details.hasOwnProperty('location') && this.details['location'].hasOwnProperty('nameAr'))
        this.data['location'] = this.details['location']['nameAr'];
      }else{
        if (this.details.hasOwnProperty('category') && this.details['category'].hasOwnProperty('titleEn'))
          this.data['category'] = this.details['category']['titleEn'];
        if (this.details.hasOwnProperty('subCategory') && this.details['subCategory'].hasOwnProperty('titleEn'))
          this.data['subCategory'] = this.details['subCategory']['titleEn'];
        if (this.details.hasOwnProperty('location') && this.details['location'].hasOwnProperty('nameEn'))
          this.data['location'] = this.details['location']['nameEn'];
    }
    // console.warn(this.details);
  }

}
