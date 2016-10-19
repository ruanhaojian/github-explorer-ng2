import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPageComponent }  from './components/user-page/user-page.component';

import { ROUTES } from './utils/routes'

const appRoutes: Routes = [
  {
    path: '',
    // redirectTo: '/user/',
    // pathMatch: 'full'
    component: UserPageComponent
  },
  {
    path: ROUTES.USER_DETAIL,
    component: UserPageComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: false });
