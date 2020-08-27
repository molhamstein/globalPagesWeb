import { ViewJobComponent } from './business/view-job/view-job.component';
import { JobCardComponent } from './business/job-card/job-card.component';
import { JobsComponent } from './business/jobs/jobs.component';
import { AddJobOpportunityComponent } from './business/add-job-opportunity/add-job-opportunity.component';
import { EditBasicInformationComponent } from './profile/edit-basic-information/edit-basic-information.component';
import { EditSkillComponent } from './profile/edit-skill/edit-skill.component';
import { EditInfoComponent } from './profile/edit-info/edit-info.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { OwlModule } from 'ngx-owl-carousel';
import { NgSelectModule } from '@ng-select/ng-select';
// import { FilterPipeModule } from 'ngx-filter-pipe';
import { volumeFilter } from './volumeFilter';

import { AppComponent } from './app.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { FooterComponent } from "./shared/footer/footer.component";
import { CardHComponent } from './shared/card-h/card-h.component';
import { CardVComponent } from './shared/card-v/card-v.component';
import { HeaderWithSearchComponent } from './home-screen/header-with-search/header-with-search.component';
import { FeaturedAdsComponent } from './home-screen/featured-ads/featured-ads.component';
import { VolumeComponent } from './home-screen/volume/volume.component';
import { HomeScreenComponent } from './home-screen/home-screen/home-screen.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ProfileViewComponent } from './profile/profile-view/profile-view.component';
import { AdsCardComponent } from './profile/ads-card/ads-card.component';
import { BusinessCardComponent } from './profile/business-card/business-card.component';
import { AdCreateComponent } from './ad/ad-create/ad-create.component';
import { AdViewComponent } from './ad/ad-view/ad-view.component';
import { BusinessCreateComponent } from './business/business-create/business-create.component';
import { BusinessViewComponent } from './business/business-view/business-view.component';
import { GuideComponent } from './business/guide/guide.component';
import { InvolveBoxComponent } from './business/involve-box/involve-box.component';
import { GuideCardComponent } from './business/guide-card/guide-card.component';
import { RequestsService } from './requests.service';
import { CommonDataService } from './common-data.service';
import { FormValidationMessageComponent } from './shared/form-validation-message/form-validation-message.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapMarkerComponent } from './business/map-marker/map-marker.component';
import { WorkingHourInputComponent } from './business/working-hour-input/working-hour-input.component';

import { InputFileModule } from 'ngx-input-file';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationPickerComponent } from './business/location-picker/location-picker.component';

// import { LightboxModule as lb } from 'ngx-lightbox';
import { AvatarModule } from 'ngx-avatar';
import { CategorySelectorComponent } from './profile/category-selector/category-selector.component';
import { BusinessEditComponent } from './business/business-edit/business-edit.component';
// import {ModalModule} from 'ngx-modal';
import { BusinessProductsComponent } from './business/business-products/business-products.component';
import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from '@ngx-gallery/lightbox';
import { VolumePageComponent } from './home-screen/volume-page/volume-page.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { NotificationComponent } from './shared/notification/notification.component';
import { AdEditComponent } from './ad/ad-edit/ad-edit.component';
import { PolicyComponent } from './privacy/policy/policy.component';
import { CvViewComponent } from './profile/cv-view/cv-view.component';
import { MatDialogModule } from '@angular/material';
import { EditJobOpportunityComponent } from './business/edit-job-opportunity/edit-job-opportunity.component';
import { VerificationMessageComponent } from './verification-message/verification-message.component';
import { SuccessMessageComponent } from './success-message/success-message.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductsComponent } from './business/products/products.component';
import { AddProductComponent } from './business/products/add-product/add-product.component';
import { ViewProductComponent } from './business/products/view-product/view-product.component';
import { EditProductComponent } from './business/products/edit-product/edit-product.component';
import { ProductCardComponent } from './business/products/product-card/product-card.component';
import { NgxLinkifyjsModule } from 'ngx-linkifyjs';
import { SuppliersComponent } from './business/suppliers/suppliers.component';
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
    volumeFilter,
    MapMarkerComponent,
    WorkingHourInputComponent,
    LocationPickerComponent,
    CategorySelectorComponent,
    BusinessEditComponent,
    BusinessProductsComponent,
    VolumePageComponent,
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
    
  ],
  imports: [
    GalleryModule.withConfig({ loadingMode: 'indeterminate' }),
    // lb,
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
    // ModalModule,
    NgxSmartModalModule.forRoot(),
    NgxSpinnerModule,
    FlexLayoutModule,
    NgxLinkifyjsModule.forRoot(),
  ],
  entryComponents: [MapMarkerComponent, EditInfoComponent, SuccessMessageComponent, VerificationMessageComponent, EditSkillComponent, EditBasicInformationComponent],
  providers: [RequestsService, CommonDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
