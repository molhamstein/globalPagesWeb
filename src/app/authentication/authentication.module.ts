import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './log-in/log-in.component';
import {Route, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ResetComponent } from './reset/reset.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import {TranslateModule} from '@ngx-translate/core';

const route:Route[] =[
  {path:'',component:LogInComponent},
  {path:'login',component:LogInComponent},
  {path:'signup',component:SignUpComponent},
  {path:'reset',component:ResetComponent},
  {path:'forget',component:ForgetPasswordComponent},


]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(route),
    TranslateModule.forChild()
  ],
  declarations: [LogInComponent, SignUpComponent, ResetComponent, ForgetPasswordComponent]
})
export class AuthenticationModule { }
