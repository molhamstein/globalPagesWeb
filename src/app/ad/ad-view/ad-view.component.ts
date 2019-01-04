import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ad-view',
  templateUrl: './ad-view.component.html',
  styleUrls: ['./ad-view.component.css']
})
export class AdViewComponent implements OnInit {
  data :any={};
  toggle1 = true;
  toggle2 = true;
  constructor(private route: ActivatedRoute,private tr: TranslateService) { }

  ngOnInit() {
    this.route.data.subscribe(({adData}) =>{
      // console.warn (adData);
      this.data['id']= adData['id'];
      this.data['phone']=adData['owner']['phoneNumber'];
      this.data['title']= adData['title'];
      this.data['creationDate'] = adData['creationDate'];
      this.data['description'] = adData['description'];
      this.data['images']= adData['media']; 
      if (this.tr.currentLang=='ar'){
        this.data['area']=adData['city']['nameAr'];
        this.data['subArea']=adData['location']['nameAr'];
        this.data['category']=adData['category']['titleAr'];
        this.data['subCategory']=adData['subCategory']['titleAr'];
      }else{
        this.data['area']=adData['city']['nameEn'];
        this.data['subArea']=adData['location']['nameEn'];
        this.data['category']=adData['category']['titleEn'];
        this.data['subCategory']=adData['subCategory']['titleEn'];

      }
    })
  }

}
