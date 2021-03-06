import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

import { CharityService } from './services/charity.service';
import { AuthenticationService } from './services/authentication.service';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CharityDetailsComponent } from './components/charity-details/charity-details.component';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { CardComponent } from './components/card/card.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { AccountCardComponent } from './components/account-card/account-card.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { DonationHistoryComponent } from './components/donation-history/donation-history.component';
import { MobileComponent } from './components/mobile/mobile.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TagFilterComponent } from './components/tag-filter/tag-filter.component';

const routes: Routes = [
  { path: '',
    component: LandingPageComponent
  },
  {
    path: 'charity/:charity_name',
    component: CharityDetailsComponent },
  {
    path: 'tag/:tag',
    component: TagFilterComponent
  },
  {
    path: 'account',
    component: AccountInfoComponent
  },
  {
    path: 'create-account',
    component: CreateAccountComponent
  },
  {
    path: 'payment-methods',
    component: PaymentMethodComponent
  },
  {
    path: 'donation-history',
    component: DonationHistoryComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'nav',
    component: NavBarComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    CharityDetailsComponent,
    AccountInfoComponent,
    CardComponent,
    CreateAccountComponent,
    AccountCardComponent,
    PaymentMethodComponent,
    DonationHistoryComponent,
    MobileComponent,
    LoginComponent,
    NavBarComponent,
    TagFilterComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    }),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [CharityService, AuthenticationService],
  bootstrap: [AppComponent, AccountCardComponent]
})
export class AppModule { }
