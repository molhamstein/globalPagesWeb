import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {passwordMatcher} from '../../shared/passwordMatcher/password-matcher';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit,AfterViewInit {

  constructor(private http:HttpClient) { }

  ngOnInit() {
  }
  @ViewChild('form') form
  ngAfterViewInit() {
    console.log(this.form)
    this.form.form.setValidators(passwordMatcher('password','repassword'))

  }
  submit(data)
  {
    if(this.form.valid)
      this.http.post(environment.api+'users/resetPassword',data).toPromise().then((data)=>{

      })
  }

}
