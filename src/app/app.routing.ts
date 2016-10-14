import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPageComponent }  from './user-page/user-page.component';

const appRoutes: Routes = [
  {
    path: '',
    // redirectTo: '/user',
    // pathMatch: 'full'
    component: UserPageComponent
  },
  {
    path: 'user/:username',
    component: UserPageComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
