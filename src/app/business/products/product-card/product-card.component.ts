import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() details: any;
  data: any = {};
  constructor(private tr: TranslateService) { }

  ngOnInit() {
    if (this.details.hasOwnProperty('id'))
      this.data['id'] = this.details['id'];

    if (this.details.hasOwnProperty('media') && this.details['media'].length > 0)
      this.data['img'] = this.details['media']['0'];
    else { 
       this.data['img'] = '../../../assets/images/page/business-01.png' ; 
    }

    if(this.details.hasOwnProperty('price'))
      this.data['price'] = this.details['price'];

    if (this.tr.currentLang == 'ar') {


      if (this.details.hasOwnProperty('titleAr'))
        this.data['title'] = this.details['titleAr'];

      if (this.details.hasOwnProperty('descriptionAr'))
        this.data['description'] = this.details['descriptionAr'];

      if (this.details.hasOwnProperty('category') && this.details['category'].hasOwnProperty('titleAr'))
        this.data['category'] = this.details['category']['titleAr'];

      if (this.details.hasOwnProperty('subCategory') && this.details['subCategory'].hasOwnProperty('titleAr'))
        this.data['subCategory'] = this.details['subCategory']['titleAr'];

      if (this.details.hasOwnProperty('city') && this.details['city'].hasOwnProperty('nameAr'))
        this.data['city'] = this.details['city']['nameAr'];


      if (this.details.hasOwnProperty('location') && this.details['location'].hasOwnProperty('nameAr'))
        this.data['location'] = this.details['location']['nameAr'];

    } else {

      if (this.details.hasOwnProperty('titleEn'))
        this.data['title'] = this.details['titleEn'];

      if (this.details.hasOwnProperty('descriptionEn'))
        this.data['description'] = this.details['descriptionEn'];

      if (this.details.hasOwnProperty('category') && this.details['category'].hasOwnProperty('titleEn'))
        this.data['category'] = this.details['category']['titleEn'];

      if (this.details.hasOwnProperty('subCategory') && this.details['subCategory'].hasOwnProperty('titleEn'))
        this.data['subCategory'] = this.details['subCategory']['titleEn'];

      if (this.details.hasOwnProperty('city') && this.details['city'].hasOwnProperty('nameEn'))
        this.data['city'] = this.details['city']['nameEn'];

      if (this.details.hasOwnProperty('location') && this.details['location'].hasOwnProperty('nameEn'))
        this.data['location'] = this.details['location']['nameEn'];

    }
  }

}
