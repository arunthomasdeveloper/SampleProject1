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
  NbLayoutModule,
  NbSidebarModule,
  NbMenuModule,
  NbListModule ,NbTreeGridModule

} from '@nebular/theme';
import { NbAuthModule } from '@nebular/auth';
import { NbAlertModule, NbButtonModule, NbCheckboxModule, NbInputModule } from '@nebular/theme';
import { SamplepageComponent } from './samplepage/samplepage.component';
import { SamplesComponent } from './samples/samples.component';
import {SamplesRoutingModule} from './samples-routing.module'
@NgModule({
  imports: [
    SamplesRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbActionsModule,
    NbCardModule,
    NbDatepickerModule, NbIconModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    NbAuthModule,
    NbLayoutModule,
    NbSidebarModule,
    NbMenuModule,
    NbListModule ,
    NbTreeGridModule
    
  ],
  declarations: [
   
    SamplepageComponent,
        SamplesComponent
  ],
  providers:[]
})
export class SamplesModule { }
