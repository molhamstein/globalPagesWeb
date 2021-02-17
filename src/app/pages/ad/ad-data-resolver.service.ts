import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { RequestsService } from '../../services/requests.service';

@Injectable({
  providedIn: 'root'
})
export class AdDataResolverService implements Resolve<any>{

  constructor(private rs: RequestsService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let id = route.params['id'];
    return this.rs.get('posts/' + id)
  }
}
