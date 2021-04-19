import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { VerifyGuard } from './guards/verify.guard';
import { AdCreateComponent } from './pages/ad/ad-create/ad-create.component';
import { AdDataResolverService } from './pages/ad/ad-data-resolver.service';
import { AdEditComponent } from './pages/ad/ad-edit/ad-edit.component';
import { AdViewComponent } from './pages/ad/ad-view/ad-view.component';
import { VolumeComponent } from './pages/ad/volume/volume.component';
import { ResetComponent } from './pages/authentication/reset/reset.component';
import { VerificationComponent } from './pages/authentication/verification/verification.component';
import { BusinessCreateComponent } from './pages/business/business-create/business-create.component';
import { BusinessEditComponent } from './pages/business/business-edit/business-edit.component';
import { BusinessViewComponent } from './pages/business/business-view/business-view.component';
import { GuideComponent } from './pages/business/guide/guide.component';
import { HomeScreenComponent } from './pages/home/home-screen/home-screen.component';
import { AddJobOpportunityComponent } from './pages/jobs/add-job-opportunity/add-job-opportunity.component';
import { EditJobOpportunityComponent } from './pages/jobs/edit-job-opportunity/edit-job-opportunity.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { ViewJobComponent } from './pages/jobs/view-job/view-job.component';
import { PolicyComponent } from './pages/privacy/policy/policy.component';
import { AddProductComponent } from './pages/products/add-product/add-product.component';
import { EditProductComponent } from './pages/products/edit-product/edit-product.component';
import { ProductsComponent } from './pages/products/products.component';
import { ViewProductComponent } from './pages/products/view-product/view-product.component';
import { CvViewComponent } from './pages/profile/cv-view/cv-view.component';
import { FollowListComponent } from './pages/profile/follow-list/follow-list.component';
import { ProfileEditComponent } from './pages/profile/profile-edit/profile-edit.component';
import { ProfileViewComponent } from './pages/profile/profile-view/profile-view.component';
import { SuppliersComponent } from './pages/suppliers/suppliers.component';
import { AuthService } from './services/auth.service';


const routes: Routes = [
  { path: 'verification', component: VerificationComponent },
  {
    path: "",
    canActivate: [VerifyGuard],
    children: [
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
      { path: 'products/:id', component: ViewProductComponent },
      { path: 'products/create', component: AddProductComponent },
      { path: 'products/:id/edit', component: EditProductComponent },
      { path: 'following', component: FollowListComponent }
    ]
  }
];

const config: ExtraOptions = {
  useHash: false,
}
@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
