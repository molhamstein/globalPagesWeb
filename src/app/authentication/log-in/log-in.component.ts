import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {format} from "date-fns";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  message
  constructor(private http:HttpClient,private router:Router,private auth:AuthService) { }
  ngOnInit() {
  }
  submit(form)
  {
    if(form.invalid)
      return
    let data=form.value
    this.http.post(environment.api+'users/login',data).subscribe((data)=>{
      localStorage.setItem(environment.userDetails,JSON.stringify(data));
      this.auth.logIn(data);
      this.router.navigate(['']);
    },error => {
      // console.log(error)
      // if(error['error']['error']['statusCode']==401)
      {
        this.message=error['error']['error']['code']
      }
    })
  }

}
