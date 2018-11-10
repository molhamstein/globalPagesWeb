import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {HttpClientModule} from '@angular/common/http';
import {OwlModule} from 'ngx-owl-carousel';
// import { FilterPipeModule } from 'ngx-filter-pipe';
import { volumeFilter} from './volumeFilter';

import { AppComponent } from './app.component';
import { NavigationComponent} from './shared/navigation/navigation.component';
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
import { RequestsService} from './requests.service';
import { CommonDataService} from './common-data.service';
import { FormValidationMessageComponent } from './shared/form-validation-message/form-validation-message.component';
import {SharedModule} from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapMarkerComponent } from './business/map-marker/map-marker.component';

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
    AdsCardComponent,
    BusinessCardComponent,
    AdCreateComponent,
    AdViewComponent,
    BusinessCreateComponent,
    BusinessViewComponent,
    GuideComponent,
    InvolveBoxComponent,
    GuideCardComponent,
    volumeFilter,
    MapMarkerComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    OwlModule,
    SharedModule,
    FormsModule,
    LeafletModule.forRoot()
  ],
  entryComponents: [MapMarkerComponent],
  providers: [RequestsService,CommonDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
