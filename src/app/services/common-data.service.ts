import { Inject, Injectable, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RequestsService } from './requests.service';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {
  filterItem: Object = {};

  countriesPromise: Promise<any>;
  citiesPromise: Promise<any>;
  adCategories: Promise<any>;
  businessCategories: Promise<any>;
  jobCategories: Promise<any>;
  productCategories: Promise<any>;

  constructor(
    private requests: RequestsService,
    private translateService: TranslateService,
    @Optional() @Inject('supplier_flag_parameter') private isSupplier: boolean) {

    this.getAdCategories();
    this.getBusinessCategories();
    this.getJobCategories();
    this.getProductCategories();
    this.getCountries();
    this.getCities();
  }

  getAdCategories() {
    this.adCategories = this.requests.get('postCategories?filter={"where":{"parentCategoryId" : {"exists" : false}},"include":"subCategories"}').toPromise();
    this.adCategories.then(res => {
      if (this.translateService.currentLang == 'ar') {
        res.forEach(element => {
          element['title'] = element['titleAr'];
          element['subCategories'].forEach(sub => {
            sub['title'] = sub['titleAr'];
          });
        });
      }
      else {
        res.forEach(element => {
          element['title'] = element['titleEn'];
          element['subCategories'].forEach(sub => {
            sub['title'] = sub['titleEn'];
          });
        });
      }
    });
  }

  getBusinessCategories() {
    if (this.isSupplier)
      this.businessCategories = this.requests.get(`businessCategories?filter={"where":{"parentCategoryId" : {"exists" : false}, "isSupplier": ${this.isSupplier}},"include":"subCategories"}`).toPromise();
    else
      this.businessCategories = this.requests.get(`businessCategories?filter={"where":{"parentCategoryId" : {"exists" : false}},"include":"subCategories"}`).toPromise();

    this.businessCategories.then(res => {
      if (this.translateService.currentLang == 'ar') {
        res.forEach(element => {
          element['title'] = element['titleAr'];
          element['subCategories'].forEach(sub => {
            sub['title'] = sub['titleAr'];
          });
        });
      }
      else {
        res.forEach(element => {
          element['title'] = element['titleEn'];
          element['subCategories'].forEach(sub => {
            sub['title'] = sub['titleEn'];
          });
        });
      }
    });
  }

  getJobCategories() {
    this.jobCategories = this.requests.get(`jobOpportunityCategories?filter={"where":{"parentCategoryId" : {"exists" : false}},"include":"subCategories"}`).toPromise();
    this.jobCategories.then(res => {
      if (this.translateService.currentLang == 'ar') {
        res.forEach(element => {
          element['title'] = element['titleAr'];
          element['subCategories'].forEach(sub => {
            sub['title'] = sub['titleAr'];
          });
        });
      }
      else {
        res.forEach(element => {
          element['title'] = element['titleEn'];
          element['subCategories'].forEach(sub => {
            sub['title'] = sub['titleEn'];
          });
        });
      }
    });
  }

  getProductCategories() {
    this.productCategories = this.requests.get('productCategories?filter={"where":{"parentCategoryId" : {"exists" : false}},"include":"subCategories"}').toPromise();
    this.productCategories.then(res => {
      if (this.translateService.currentLang == 'ar') {
        res.forEach(element => {
          element['title'] = element['titleAr'];
          element['subCategories'].forEach(sub => {
            sub['title'] = sub['titleAr'];
          });
        });
      }
      else {
        res.forEach(element => {
          element['title'] = element['titleEn'];
          element['subCategories'].forEach(sub => {
            sub['title'] = sub['titleEn'];
          });
        });
      }
    })
  }

  getCountries() {
    this.countriesPromise = this.requests.get('countries').toPromise();
    this.countriesPromise.then(res => {
      if (this.translateService.currentLang == 'ar') {
        res.forEach(element => {
          element['name'] = element['nameAr'];
        });
      }
      else {
        res.forEach(element => {
          element['name'] = element['nameEn'];
        });
      }
    });
  }

  getCities(countryId?: string) {
    let filter = '';
    if (!countryId)
      filter = 'filter[include]=locations';
    else
      filter = `filter={"where":{"countryId": "${countryId}"},"include":"locations"}`;

    this.citiesPromise = this.requests.get('cities?' + filter).toPromise();
    return this.citiesPromise.then(res => {
      if (this.translateService.currentLang == 'ar') {
        res.forEach(element => {
          element['name'] = element['nameAr'];
          element['locations'].forEach(loc => {
            loc['name'] = loc['nameAr'];
          });
        });
        return res;
      }
      else {
        res.forEach(element => {
          element['name'] = element['nameEn'];
          element['locations'].forEach(loc => {
            loc['name'] = loc['nameEn'];
          });
        });
        return res;
      }
    });
  }

}
