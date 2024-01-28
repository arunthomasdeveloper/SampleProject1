import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './helpers/auth.guard';
import { NotFoundComponent } from './pages/miscellaneous/not-found/not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
 // { path: '', component: DashboardComponent, canActivate: [AuthGuard] },

  {
    path: 'pages',
  //   loadChildren: () => import('./pages/pages.module')
  //     .then(m => m.PagesModule),canActivate: [AuthGuard]
  // },
  loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.NgxAuthModule),
  },  
  {
    path: 'sample',
    loadChildren: () => import('./samples/samples.module')
      .then(m => m.SamplesModule),
  }, 
  {
    path: '**',
    component: NotFoundComponent,
  },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}



