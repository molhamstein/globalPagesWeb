import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private http:HttpClient) { }
  ngOnInit() {
  }
  submit(data)
  {
    this.http.post(environment.api+'users/login',data).toPromise().then((data)=>{

    })
  }

}
