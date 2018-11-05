import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-card-v',
  templateUrl: './card-v.component.html',
  styleUrls: ['./card-v.component.css']
})
export class CardVComponent implements OnInit {
  @Input() details: Object;
  data: Object = {};
  constructor(private tr:TranslateService) { }

  ngOnInit() {
    this.data['id']= this.details['id'];
    this.data['title'] = this.details['title'];
    this.data['description'] = this.details['description'];
    this.data['img'] = 'assets/images/page/abo-alrod.jpg';
    if (this.details['media']['0']['thumbnail'])
      this.data['img'] = this.details['media']['0']['thumbnail'];
    if (this.tr.currentLang == 'ar') {
      this.data['category'] = this.details['category']['titleAr'];
      this.data['subCategory'] = this.details['subCategory']['titleAr'];
      this.data['location'] = this.details['location']['nameAr'];
    }else{
      this.data['category'] = this.details['category']['titleEn'];
      this.data['subCategory'] = this.details['subCategory']['titleEn'];
      this.data['location'] = this.details['location']['nameEn'];
    }
    // console.warn(this.details);
  }

}
