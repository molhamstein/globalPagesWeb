import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestsService } from './requests.service';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {
  categoriesPromise;
  selectedCategory: any;
  constructor(private requests: RequestsService) {
    this.categoriesPromise=
    this.requests.get('postCategories?filter={"where":{"parentCategoryId" : {"exists" : false}},"include":"subCategories"}').toPromise();
   }

}
