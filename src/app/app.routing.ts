import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPageComponent }  from './components/user-page/user-page.component';
import { RepoListComponent }  from './components/repo-list/repo-list.component';
import { RepoDetailComponent }  from './components/repo-detail/repo-detail.component';

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
  },
  {
    path: ROUTES.USER_REPO_LIST,
    component: RepoListComponent
  },
  {
    path: ROUTES.REPO_DETAIL,
    component: RepoDetailComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: false });
