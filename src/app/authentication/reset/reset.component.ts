import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {passwordMatcher} from '../../shared/passwordMatcher/password-matcher';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { ResetPasswordComponent } from '../modals/reset-password/reset-password.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit, AfterViewInit{

  constructor(private dialog: MatDialog,
    private router: Router) { }

  ngAfterViewInit() { 
    this.onReset();     
  }

  ngOnInit() {
  }

  onReset() { 
    let dialogRef = this.dialog.open(ResetPasswordComponent, {
      panelClass: 'communictioDialogStyle',
    });
    dialogRef.afterClosed().subscribe(data => {
        this.router.navigate(['/']);
    });
  }

  // @ViewChild('form',{static:false}) form
  // ngAfterViewInit() {
  //   console.log(this.form)
  //   this.form.form.setValidators(passwordMatcher('password','repassword'))

  // }
  // submit(data)
  // {
  //   if(this.form.valid)
  //     this.http.post(environment.api+'users/resetPassword',data).toPromise().then((data)=>{

  //     })
  // }

}
