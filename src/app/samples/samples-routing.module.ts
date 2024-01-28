import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SamplepageComponent } from './samplepage/samplepage.component';
import { SamplesComponent } from './samples/samples.component';
export const routes: Routes = [
  {
    path: '',
    component: SamplesComponent,
    children: [ {
        path: 'samplepage',
        component: SamplepageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SamplesRoutingModule { }
