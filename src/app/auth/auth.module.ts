import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NbActionsModule,
  NbCardModule,
  NbDatepickerModule, NbIconModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';
import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import { NbAlertModule, NbButtonModule, NbCheckboxModule, NbInputModule } from '@nebular/theme';

import { NgxLoginComponent } from './login/login.component';
import { LoginpageComponent } from '../pages/loginpage/loginpage.component'; // <---
import { SignupComponent } from '../pages/signup/signup.component';
import { HomePageComponent } from '../pages/homepage/homepage.component';
import { UserService } from '../pages/users/users.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,
    NbActionsModule,
    NbCardModule,
    NbDatepickerModule, NbIconModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    NbAuthModule,
  ],
  declarations: [
    NgxLoginComponent,
    LoginpageComponent, // <---
    SignupComponent,
    HomePageComponent
  ],
  providers:[UserService]
})
export class NgxAuthModule {
}