import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { HamburgerIconComponent } from './components/hamburger-icon/hamburger-icon.component';
import { LoadingBlockComponent } from './components/loading-block/loading-block.component';
import { FooterBarComponent } from './components/footer-bar/footer-bar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TextHolderComponent } from './components/text-holder/text-holder.component';
import { AvatarComponent } from './components/avatar/avatar.component';

import { routing } from './app.routing';

import { ActionService } from './action/action.service'



@NgModule({
  declarations: [
    AppComponent,
    MainContentComponent,
    UserPageComponent,
    HeaderBarComponent,
    HamburgerIconComponent,
    LoadingBlockComponent,
    FooterBarComponent,
    ProfileComponent,
    TextHolderComponent,
    AvatarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    ActionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
