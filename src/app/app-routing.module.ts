import { NgModule } from '@angular/core';
import {Routes, RouterModule, ExtraOptions} from '@angular/router';
import {AuthenticationModule} from './authentication/authentication.module';

const routes: Routes = [
  {path:'auth',loadChildren:'./authentication/authentication.module#AuthenticationModule'}
];

const config:ExtraOptions={
  useHash:true,
}
@NgModule({
  imports: [RouterModule.forRoot(routes,config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
