import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestsService } from './requests.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {
  categoriesPromise;
  citiesPromise;
  filterItem: Object = {};

  bCategoryPromise;
  jCategoryPromise;

  constructor(private requests: RequestsService, private ts: TranslateService) {
    //categories and subCategories, then adding a title attribute depending on selected language 
    this.categoriesPromise =
      this.requests.get('postCategories?filter={"where":{"parentCategoryId" : {"exists" : false}},"include":"subCategories"}').toPromise();
    this.categoriesPromise.then(function (res) {
      if (ts.currentLang == 'ar') {
        res.forEach(element => {
          element['title'] = element['titleAr'];
          element['subCategories'].forEach(sub => {
            sub['title'] = sub['titleAr'];
          });
        });
      } else {
        res.forEach(element => {
          element['title'] = element['titleEn'];
          element['subCategories'].forEach(sub => {
            sub['title'] = sub['titleEn'];
          });
        });
      }
    });

    // cities and sub-areas, then add a name attribute depending on selected language
    this.citiesPromise =
      this.requests.get('cities?filter[include]=locations').toPromise();
    this.citiesPromise.then(function (res) {
      if (ts.currentLang == 'ar') {
        res.forEach(element => {
          element['name'] = element['nameAr'];
          element['locations'].forEach(loc => {
            loc['name'] = loc['nameAr'];
          });
        });
      } else {
        res.forEach(element => {
          element['name'] = element['nameEn'];
          element['locations'].forEach(loc => {
            loc['name'] = loc['nameEn'];
          });
        });
      }
    })

    // Business categories, then add a title attribute depending on selected language
    this.bCategoryPromise = this.requests.get('businessCategories?filter={"where":{"parentCategoryId" : {"exists" : false}},"include":"subCategories"}').toPromise();
    this.bCategoryPromise.then(function (res) {
      if (ts.currentLang == 'ar') {
        res.forEach(element => {
          element['title'] = element['titleAr'];
          element['subCategories'].forEach(sub => {
            sub['title'] = sub['titleAr'];
          });
        });
      } else {
        res.forEach(element => {
          element['title'] = element['titleEn'];
          element['subCategories'].forEach(sub => {
            sub['title'] = sub['titleEn'];
          });
        });
      }
    })


    // Job categories, then add a title attribute depending on selected language
    this.jCategoryPromise = this.requests.get('jobOpportunityCategories?filter={"where":{"parentCategoryId" : {"exists" : false}},"include":"subCategories"}').toPromise();
    this.jCategoryPromise.then(function (res) {
      if (ts.currentLang == 'ar') {
        res.forEach(element => {
          element['title'] = element['titleAr'];
          element['subCategories'].forEach(sub => {
            sub['title'] = sub['titleAr'];
          });
        });
      } else {
        res.forEach(element => {
          element['title'] = element['titleEn'];
          element['subCategories'].forEach(sub => {
            sub['title'] = sub['titleEn'];
          });
        });
      }
    })

    
  }

}
