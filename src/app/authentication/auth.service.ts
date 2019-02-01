import {EventEmitter, Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {format} from "date-fns";
import {RequestsService} from '../requests.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin=false
  private _userData;
  private _userDataSubject=new Subject()
  userData =new Observable(o=>{
    if(this._userData)
      o.next(this._userData)
    else
      this._userDataSubject.subscribe(o)
  });
  logInData;
  constructor(private api:RequestsService) {
    if(localStorage.getItem(environment.userDetails)){
      this.logInData=JSON.parse(localStorage.getItem(environment.userDetails))
      this.isLogin=true;
      this.getUserData()
    }
  }
  logIn(data){
    localStorage.setItem(environment.userDetails,JSON.stringify(data));
    this.logInData=data
    this.isLogin=true;
    this.getUserData()
  }
  logout(){
    localStorage.clear()
    this.isLogin=false
    this._login.next(false)
  }

  loginStatus=new Observable(o=>{
    this._login.subscribe(o)
    o.next(this.isLogin)
  })
  private _login=new Subject()

  private getUserData(){
    this.api.get('users/'+this.logInData['userId']).toPromise().then((data)=>{
      data['birthDate']= format(new Date(data['birthDate']),'DD-MM-YYYY')
      this._userData=data;
      this._userDataSubject.next(data)
      this._login.next(true)
    })
  }
}
