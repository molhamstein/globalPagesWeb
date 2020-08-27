import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private http:HttpClient) { }
  @ViewChild('form',{static:false}) form
  verificationCode=false
  ngOnInit() {
  }
  submit(data)
  {
    if(this.form.valid)
      this.http.post(environment.api+'users/forgotPassword',data).toPromise().then((data)=>{
        this.verificationCode=true;
      })
  }

}
