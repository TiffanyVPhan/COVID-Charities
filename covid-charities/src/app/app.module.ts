import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

import { AccountService } from './services/account.service';
import { CharityService } from './services/charity.service';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CharityDetailsComponent } from './components/charity-details/charity-details.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'charity/:charity_name', component: CharityDetailsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    CharityDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    })
  ],
  providers: [AccountService, CharityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
