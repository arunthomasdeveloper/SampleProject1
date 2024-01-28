import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbAuthComponent } from '@nebular/auth';
import { HomePageComponent } from '../pages/homepage/homepage.component';
import { LoginpageComponent } from '../pages/loginpage/loginpage.component';
import { SignupComponent } from '../pages/signup/signup.component';


export const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
        path: 'login',
        component: LoginpageComponent, // <---
      },
      {
        path: 'signup',
        component: SignupComponent, // <---
      },
      {
        path: 'homepage',
        component: HomePageComponent,
      }
     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}