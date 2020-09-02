import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  api = environment.api;
  header = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.init();
  }

  init() {
    const user = JSON.parse(localStorage.getItem(environment.userDetails));
    if (user)
      this.header = this.header.append('Authorization', user['id']);
    else
      this.header = new HttpHeaders();
  }

  getWithHeaders(name, params = {}) {
    return this.http.get(this.api + name, { params, headers: this.header, observe: 'response' });
  }

  get(name, params?) {
    if (params) {
      // Params are sent as a JSON Object
      return this.http.get(this.api + name, { params: params, headers: this.header });
    }
    return this.http.get(this.api + name, { headers: this.header });
  }

  post(name, data, h?) {
    let header: HttpHeaders = this.header;
    if (h) header = Object.assign(this.header, h);
    return this.http.post(this.api + name, data, { headers: header });
  }

  put(name, data) {
    return this.http.put(this.api + name, data, { headers: this.header });
  }

  patch(name, data) {
    return this.http.patch(this.api + name, data, { headers: this.header });
  }

  delete(name, id?) {
    if (id) name += '\\' + id;
    return this.http.delete(this.api + name, { headers: this.header });
  }
}
