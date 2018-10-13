import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent} from './navigation/navigation.component';
import { HeaderWithSearchComponent } from './header-with-search/header-with-search.component';
import { FooterComponent } from "./footer/footer.component";

import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    HeaderWithSearchComponent
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
