import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {FormGroup} from '@angular/forms';
import {passwordMatcher} from '../../shared/passwordMatcher/password-matcher';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit,AfterViewInit {

  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit() {
  }
  @ViewChild('form') form
  ngAfterViewInit() {
    // this.form.form.setValidators(passwordMatcher('password','repassword'))

  }
  submit(data)
  {
    delete data['repassword']
    if(!this.form.invalid){
      this.http.post(environment.api+'users',data).toPromise().then((data1)=>{
        this.http.post(environment.api+'users/login',{email:data["email"],password:data["password"]}).toPromise().then((data2)=>{
          localStorage.setItem(environment.userDetails,JSON.stringify(data2));
          this.router.navigate(['profile',data2["userId"]]);
        })
        // this.router.navigate(['auth/login'])
      })
    }

  }
}
