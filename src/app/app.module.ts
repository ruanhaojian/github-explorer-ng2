import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MainContentComponent } from './main-content/main-content.component';
import { UserPageComponent } from './user-page/user-page.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { HamburgerIconComponent } from './hamburger-icon/hamburger-icon.component';
import { LoadingBlockComponent } from './loading-block/loading-block.component';
import { FooterBarComponent } from './footer-bar/footer-bar.component';
import { routing } from './app.routing';



@NgModule({
  declarations: [
    AppComponent,
    MainContentComponent,
    UserPageComponent,
    HeaderBarComponent,
    HamburgerIconComponent,
    LoadingBlockComponent,
    FooterBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
