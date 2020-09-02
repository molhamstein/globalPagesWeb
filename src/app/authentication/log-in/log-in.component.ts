import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  message;

  constructor(private http: HttpClient, private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
  }


  submit(form) {
    this.message = null;
    if (form.invalid) return;
    let data = form.value;
    this.http.post(environment.api + 'users/login', data).subscribe(
      data => {
        localStorage.setItem(environment.userDetails, JSON.stringify(data));
        this.auth.logIn(data);
        this.router.navigate(['']);
      },
      error => {
        this.message = error['error']['error']['code'];
      });
  }

}
