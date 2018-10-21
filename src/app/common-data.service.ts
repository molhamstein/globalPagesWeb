import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestsService } from './requests.service';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {
  categoriesObservable:Observable<Object>;
  static count: number=0;
  constructor(private requests: RequestsService) {
    this.categoriesObservable=
    this.requests.get('postCategories?filter={"where":{"parentCategoryId" : {"exists" : false}},"include":"subCategories"}');
      console.warn("created an instance",CommonDataService.count++);
   }

}
