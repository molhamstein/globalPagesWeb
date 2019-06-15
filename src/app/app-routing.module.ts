import { NgModule } from '@angular/core';
import {Routes, RouterModule, ExtraOptions} from '@angular/router';
import {HomeScreenComponent} from './home-screen/home-screen/home-screen.component';
import {BusinessCreateComponent} from './business/business-create/business-create.component';
import {BusinessViewComponent} from './business/business-view/business-view.component';
import {ProfileViewComponent} from './profile/profile-view/profile-view.component';
import {ProfileEditComponent} from './profile/profile-edit/profile-edit.component';
import {AdViewComponent} from './ad/ad-view/ad-view.component';
import {AdCreateComponent} from './ad/ad-create/ad-create.component';
import {GuideComponent} from './business/guide/guide.component';
import { AdDataResolverService} from './ad-data-resolver.service';
import {AuthService} from './authentication/auth.service';
import {BusinessEditComponent} from './business/business-edit/business-edit.component';
import {VolumeComponent} from './home-screen/volume/volume.component';
const routes: Routes = [
  {path:'auth',loadChildren:() => import('./authentication/authentication.module').then(m => m.AuthenticationModule)},
  {path:'',component:HomeScreenComponent},
  {path:'business/create',component:BusinessCreateComponent,canActivate:[AuthService]},
  {path:'business/:id',component:BusinessViewComponent},
  {path:'business/:id/edit',component:BusinessEditComponent},
  {path:'profile',component:ProfileViewComponent,canActivate:[AuthService]},
  {path:'profile/edit',component:ProfileEditComponent,canActivate:[AuthService]},
  {path:'ad/create',component:AdCreateComponent,canActivate:[AuthService]},
  {path: 'ad/:id', component: AdViewComponent, resolve: { adData: AdDataResolverService} },
  {path: 'ad/:id/edit', component: AdCreateComponent, resolve: { adData: AdDataResolverService} },
  {path:'guide',component:GuideComponent},
  {path:'volume/:id',component:VolumeComponent},

];

const config:ExtraOptions={
  useHash:false,
}
@NgModule({
  imports: [RouterModule.forRoot(routes,config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
