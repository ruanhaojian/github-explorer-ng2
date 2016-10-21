import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// component
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
import { RepoItemComponent } from './components/repo-item/repo-item.component';
import { RepoContentComponent } from './components/repo-content/repo-content.component';
import { RepoListComponent } from './components/repo-list/repo-list.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
// pipe
import { FromNowPipe } from './pipe/from-now.pipe'
// routing
import { routing } from './app.routing';
// service
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
    AvatarComponent,
    RepoItemComponent,
    RepoContentComponent,
    RepoListComponent,
    SearchInputComponent,
      
    FromNowPipe
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
