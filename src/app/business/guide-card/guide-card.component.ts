import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-guide-card',
  templateUrl: './guide-card.component.html',
  styleUrls: ['./guide-card.component.css']
})
export class GuideCardComponent implements OnInit {
  @Input() post:any;
  data: any = {};
  constructor(private tr:TranslateService) { }

  ngOnInit() {
    console.warn(this.post)
    // delete following condition when deployment
    if (this.post.hasOwnProperty('covers') && this.post['covers'].length > 0 && this.post['covers']['0'].hasOwnProperty('url')){
      this.data['img'] = this.post['covers']['0']['url'];
    }

    if (this.post.hasOwnProperty('description')) {
      this.data['description'] = this.post['description'];
    }

    if (this.post.hasOwnProperty('id')){
      this.data['id'] = this.post['id'];
    }

    if(this.tr.currentLang=='ar'){
      if (this.post.hasOwnProperty('nameAr')){
        this.data['name'] = this.post['nameAr'];
      }
      if (this.post.hasOwnProperty('category') && this.post['category'].hasOwnProperty('titleAr')){
        this.data['category']= this.post['category']['titleAr'];
      }
      if (this.post.hasOwnProperty('subCategory') && this.post['subCategory'].hasOwnProperty('titleAr')){
        this.data['subCategory'] = this.post['subCategory']['titleAr']
      }
    }else{
      if (this.post.hasOwnProperty('nameEn')) {
        this.data['name'] = this.post['nameEn'];
      }
      if (this.post.hasOwnProperty('category') && this.post['category'].hasOwnProperty('titleEn')) {
        this.data['category'] = this.post['category']['titleEn'];
      }
      if (this.post.hasOwnProperty('subCategory') && this.post['subCategory'].hasOwnProperty('titleEn')) {
        this.data['subCategory'] = this.post['subCategory']['titleEn']
      }
    }
  }

}
