import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-guide-card',
  templateUrl: './guide-card.component.html',
  styleUrls: ['./guide-card.component.css']
})
export class GuideCardComponent implements OnInit {
  @Input() post
  data: Object = {};
  constructor(private tr:TranslateService) { }

  ngOnInit() {
    // console.warn(this.post)
    // delete following condition when deployment
    if (this.post.hasOwnProperty('media') && this.post['media'].length >0 && this.post['media']['0'].hasOwnProperty('url'))
    this.data['img']=this.post['media']['0']['url'];
    this.data['description'] = this.post['description'];
    this.data['description'] = this.post['description'];
    this.data['id'] = this.post['id'];
    if(this.tr.currentLang=='ar'){
      this.data['name'] = this.post['nameAr'];
      this.data['category']= this.post['category']['titleAr'];
      this.data['subCategory'] = this.post['subCategory']['titleAr']
    }else{
      this.data['name'] = this.post['nameEn'];
      this.data['category']= this.post['category']['titleEn'];
      this.data['subCategory'] = this.post['subCategory']['titleEn']
    }
  }

}
