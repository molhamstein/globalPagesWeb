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
const routes: Routes = [
  {path:'auth',loadChildren:'./authentication/authentication.module#AuthenticationModule'},
  {path:'',component:HomeScreenComponent},
  {path:'business/create',component:BusinessCreateComponent},
  {path:'business/:id',component:BusinessViewComponent},
  {path:'profile/:id',component:ProfileViewComponent},
  {path:'profile/:id/edit',component:ProfileEditComponent},
  { path: 'ad/:id', component: AdViewComponent, resolve: { adData: AdDataResolverService } },
  {path:'ad/create',component:AdCreateComponent},
  {path:'guide',component:GuideComponent},

];

const config:ExtraOptions={
  useHash:false,
}
@NgModule({
  imports: [RouterModule.forRoot(routes,config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
