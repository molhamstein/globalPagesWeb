import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavigationComponent} from './shared/navigation/navigation.component';
import { FooterComponent } from "./shared/footer/footer.component";
import { CardHComponent } from './shared/card-h/card-h.component';
import { CardVComponent } from './shared/card-v/card-v.component';
import { HeaderWithSearchComponent } from './home-screen/header-with-search/header-with-search.component';
import { FeaturedAdsComponent } from './home-screen/featured-ads/featured-ads.component';
import { VolumeComponent } from './home-screen/volume/volume.component';

import {TranslateModule} from '@ngx-translate/core';
import { HomeScreenComponent } from './home-screen/home-screen/home-screen.component';

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
    HomeScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
