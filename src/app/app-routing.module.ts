import { ViewJobComponent } from './business/view-job/view-job.component';
import { JobsComponent } from './business/jobs/jobs.component';
import { AddJobOpportunityComponent } from './business/add-job-opportunity/add-job-opportunity.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { HomeScreenComponent } from './home-screen/home-screen/home-screen.component';
import { BusinessCreateComponent } from './business/business-create/business-create.component';
import { BusinessViewComponent } from './business/business-view/business-view.component';
import { ProfileViewComponent } from './profile/profile-view/profile-view.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { AdViewComponent } from './ad/ad-view/ad-view.component';
import { AdCreateComponent } from './ad/ad-create/ad-create.component';
import { GuideComponent } from './business/guide/guide.component';
import { AdDataResolverService } from './ad-data-resolver.service';
import { AuthService } from './authentication/auth.service';
import { BusinessEditComponent } from './business/business-edit/business-edit.component';
import { VolumeComponent } from './home-screen/volume/volume.component';
import { AdEditComponent } from './ad/ad-edit/ad-edit.component';
import { PolicyComponent } from './privacy/policy/policy.component';
import { CvViewComponent } from './profile/cv-view/cv-view.component';
import { EditJobOpportunityComponent } from './business/edit-job-opportunity/edit-job-opportunity.component';
import { ProductsComponent } from './business/products/products.component';
import { ViewProductComponent } from './business/products/view-product/view-product.component';
import { EditProductComponent } from './business/products/edit-product/edit-product.component';
import { AddProductComponent } from './business/products/add-product/add-product.component';
import { SuppliersComponent } from './business/suppliers/suppliers.component';
import { ResetComponent } from './authentication/reset/reset.component';


const routes: Routes = [
  { path: '', component: HomeScreenComponent },
  { path: 'auth/reset', component: ResetComponent },
  { path: 'business/create', component: BusinessCreateComponent, canActivate: [AuthService] },
  { path: 'business/:id', component: BusinessViewComponent },
  { path: 'business/:id/addJobOpportunity', component: AddJobOpportunityComponent },
  { path: 'addJobOpportunity', component: AddJobOpportunityComponent },
  { path: 'editJobOpportunity/:id', component: EditJobOpportunityComponent },
  { path: 'business/:id/edit', component: BusinessEditComponent },
  { path: 'profile', component: ProfileViewComponent, canActivate: [AuthService] },
  { path: 'cv/:id', component: CvViewComponent, canActivate: [AuthService] },
  { path: 'profile/edit', component: ProfileEditComponent, canActivate: [AuthService] },
  { path: 'ad/create', component: AdCreateComponent, canActivate: [AuthService] },
  { path: 'ad/:id', component: AdViewComponent, resolve: { adData: AdDataResolverService } },
  { path: 'ad/:id/edit', component: AdEditComponent, resolve: { adData: AdDataResolverService } },
  { path: 'guide', component: GuideComponent },
  { path: 'suppliers', component: SuppliersComponent },
  { path: 'job', component: JobsComponent },
  { path: 'job/:id', component: ViewJobComponent },
  { path: 'volume/:id', component: VolumeComponent },
  { path: 'privacy/policy', component: PolicyComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/create', component: AddProductComponent },
  { path: 'products/:id', component: ViewProductComponent },
  { path: 'products/:id/edit', component: EditProductComponent },
];

const config: ExtraOptions = {
  useHash: false,
}
@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
