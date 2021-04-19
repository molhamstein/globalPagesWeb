import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgSelectModule } from '@ng-select/ng-select';
import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from '@ngx-gallery/lightbox';
import { TranslateModule } from '@ngx-translate/core';
import { AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider, SocialLoginModule } from "angularx-social-login";
// import { LightboxModule as lb } from 'ngx-lightbox';
import { AvatarModule } from 'ngx-avatar';
import { InputFileModule } from 'ngx-input-file';
import { NgxLinkifyjsModule } from 'ngx-linkifyjs';
import { OwlModule } from 'ngx-owl-carousel';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { NgxSpinnerModule } from "ngx-spinner";
import { TabsModule } from "ngx-tabs";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompleteInformationComponent } from './modals/auth/complete-information/complete-information.component';
import { ForgetPasswordComponent } from './modals/auth/forget-password/forget-password.component';
import { LoginComponent } from './modals/auth/login/login.component';
import { ResetPasswordComponent } from './modals/auth/reset-password/reset-password.component';
import { SignupComponent } from './modals/auth/signup/signup.component';
import { SuccessMessageComponent } from './modals/messages/success-message/success-message.component';
import { VerificationMessageComponent } from './modals/messages/verification-message/verification-message.component';
import { MakeOrderComponent } from './modals/order/make-order/make-order.component';
import { EditBasicInformationComponent } from './modals/profile/edit-basic-information/edit-basic-information.component';
import { EditInfoComponent } from './modals/profile/edit-info/edit-info.component';
import { EditSkillComponent } from './modals/profile/edit-skill/edit-skill.component';
import { AddRateComponent } from './modals/rate/add-rate/add-rate.component';
import { SendVerificationCodeComponent } from './modals/sms/send-verification-code/send-verification-code.component';
import { AdCreateComponent } from './pages/ad/ad-create/ad-create.component';
import { AdEditComponent } from './pages/ad/ad-edit/ad-edit.component';
import { AdViewComponent } from './pages/ad/ad-view/ad-view.component';
import { VolumeFilterPipe } from './pages/ad/volume-filter.pipe';
import { VolumeComponent } from './pages/ad/volume/volume.component';
import { ResetComponent } from './pages/authentication/reset/reset.component';
import { BusinessCreateComponent } from './pages/business/business-create/business-create.component';
import { BusinessEditComponent } from './pages/business/business-edit/business-edit.component';
import { BusinessProductsComponent } from './pages/business/business-products/business-products.component';
import { InvolveBoxComponent } from './pages/business/business-products/involve-box/involve-box.component';
import { BusinessViewComponent } from './pages/business/business-view/business-view.component';
import { GuideComponent } from './pages/business/guide/guide.component';
import { FeaturedAdsComponent } from './pages/home/featured-ads/featured-ads.component';
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
import { CommonDataService } from './services/common-data.service';
import { RequestsService } from './services/requests.service';
import { AdsCardComponent } from './shared/cards/ads-card/ads-card.component';
import { BusinessCardComponent } from './shared/cards/business-card/business-card.component';
import { CardHComponent } from './shared/cards/card-h/card-h.component';
import { CardVComponent } from './shared/cards/card-v/card-v.component';
import { GuideCardComponent } from './shared/cards/guide-card/guide-card.component';
import { JobCardComponent } from './shared/cards/job-card/job-card.component';
import { ProductCardComponent } from './shared/cards/product-card/product-card.component';
import { CartComponent } from './shared/components/cart/cart.component';
import { FooterComponent } from "./shared/components/footer/footer.component";
import { HeaderWithSearchComponent } from './shared/components/header-with-search/header-with-search.component';
import { LocationPickerComponent } from './shared/components/location-picker/location-picker.component';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { NotificationComponent } from './shared/components/notification/notification.component';
import { SharedModule } from './shared/shared.module';
import { VerificationComponent } from './pages/authentication/verification/verification.component';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("929370797523-269s5t1ftp86eph3hd0c41qca0rdq63i.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("672315350040982")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    HeaderWithSearchComponent,
    CardHComponent,
    CardVComponent,
    FeaturedAdsComponent,
    VolumeComponent,
    HomeScreenComponent,
    ProfileEditComponent,
    ProfileViewComponent,
    CvViewComponent,
    AdsCardComponent,
    BusinessCardComponent,
    AdCreateComponent,
    AdViewComponent,
    BusinessCreateComponent,
    AddJobOpportunityComponent,
    EditJobOpportunityComponent,
    JobsComponent,
    BusinessViewComponent,
    GuideComponent,
    InvolveBoxComponent,
    GuideCardComponent,
    JobCardComponent,
    ViewJobComponent,
    LocationPickerComponent,
    BusinessEditComponent,
    BusinessProductsComponent,
    NotificationComponent,
    AdEditComponent,
    PolicyComponent,
    EditInfoComponent,
    EditSkillComponent,
    SuccessMessageComponent,
    VerificationMessageComponent,
    EditBasicInformationComponent,
    ProductsComponent,
    AddProductComponent,
    ViewProductComponent,
    EditProductComponent,
    ProductCardComponent,
    SuppliersComponent,
    ResetComponent,
    LoginComponent,
    SignupComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,
    CompleteInformationComponent,
    AddRateComponent,
    FollowListComponent,
    VolumeFilterPipe,
    CartComponent,
    MakeOrderComponent,
    SendVerificationCodeComponent,
    VerificationComponent,
  ],
  imports: [
    GalleryModule.withConfig({ loadingMode: 'indeterminate' }),
    LightboxModule,
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    OwlModule,
    SharedModule,
    MatDialogModule,
    FormsModule,
    LeafletModule.forRoot(),
    BrowserAnimationsModule,
    InputFileModule.forRoot({}),
    NgSelectModule,
    AvatarModule,
    NgxSmartModalModule.forRoot(),
    NgxSpinnerModule,
    FlexLayoutModule,
    NgxLinkifyjsModule.forRoot(),
    SocialLoginModule,
    TabsModule,
  ],
  entryComponents: [
    EditInfoComponent,
    SuccessMessageComponent,
    VerificationMessageComponent,
    EditSkillComponent,
    EditBasicInformationComponent,
    LoginComponent,
    SignupComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,
    CompleteInformationComponent,
    AddRateComponent,
    MakeOrderComponent,
    SendVerificationCodeComponent,
  ],
  providers: [
    RequestsService,
    CommonDataService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
