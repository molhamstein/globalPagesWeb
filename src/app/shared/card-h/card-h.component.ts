import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-card-h',
  templateUrl: './card-h.component.html',
  styleUrls: ['./card-h.component.css']
})
export class CardHComponent implements OnInit {
  @Input() details: Object;
  data: Object = {};
  constructor(private tr: TranslateService) { }

  ngOnInit() {
    this.data['title'] = this.details['title'];
    this.data['description'] = this.details['description'];
    if (this.tr.currentLang == 'ar') {
      this.data['category'] = this.details['category']['titleAr'];
      this.data['subCategory'] = this.details['subCategory']['titleAr'];
      this.data['location'] = this.details['location']['nameAr'];
    } else {
      this.data['category'] = this.details['category']['titleEn'];
      this.data['subCategory'] = this.details['subCategory']['titleEn'];
      this.data['location'] = this.details['location']['nameEn'];
    }
  }

}
