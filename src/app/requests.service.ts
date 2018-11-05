import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  api = environment.api;
  // header = new HttpHeaders();
  constructor(private http : HttpClient) {
    // let userDetails = JSON.parse(localStorage.getItem(environment.userDetails))
    // console.warn('user Details',userDetails.id);
    // if(userDetails && userDetails.id){
    //   // this.header=this.header.append('Authorization',userDetails.id);
    //   // this.header = this.header.append('Content-Type','application/json');
    //   console.warn(this.header)
    // }
   }
  
  get(name, params?){
    if (params) {
        // console.warn(params)
        // Params are sent as a JSON Object
      return this.http.get(this.api + name, { params: params });
    }
    return this.http.get(this.api + name);
  }
  post(name,data,h?){
    if (h){
      return this.http.post(this.api+name,data,{headers:h});
    }
    return this.http.post(this.api+name,data);
  }
  
}
