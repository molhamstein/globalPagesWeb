import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  api = environment.api;

  constructor(private http : HttpClient) { }
  
  get(name, params?){
    if (params) {
        // console.warn(params)
        // Params are sent as a JSON Object
      return this.http.get(this.api + name, { params: params });
    }
    return this.http.get(this.api + name);
  }
  
}
