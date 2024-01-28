import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import {
  NbActionsModule,
  NbLayoutModule,
  NbButtonModule,
  NbCardModule,
  NbSidebarModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { EmailComponentComponent } from './email-component/email-component.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { ResetPassComponent } from './users/reset-pass/reset-pass.component';
import { ReactiveFormsModule }  from '@angular/forms';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { UserService } from './users/users.service';
import{AddUserComponent} from './users/add-user/add-user.component';
import { DeleteUsersComponent } from './users/delete-users/delete-users.component';
import { HomeService } from '../services/homepage.service';



@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  ngFormsModule,
  ReactiveFormsModule,
  NbLayoutModule,
  NbSidebarModule
  ],
  
  declarations: [
    PagesComponent,
    EmailComponentComponent,
    UpdateUserComponent,
    ResetPassComponent,
    AddUserComponent,
    DeleteUsersComponent

    
      ],providers:[HomeService,UserService],
})
export class PagesModule {
}
