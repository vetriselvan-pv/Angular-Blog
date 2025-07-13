import { Routes } from '@angular/router';
import { Login } from './src/app/page/login/login';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'roles',
    loadChildren: () => ROLES_ROUTES,
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];

export const ROLES_ROUTES = [
  {
    path: '',
    loadComponent: () =>
      import('./src/app/page/roles/roles').then((m) => m.Roles),
    loadChildren: () => {
      let routes = [];
      if (localStorage.getItem('role') === 'admin') {
        routes.push({
          path: 'admin',
          loadComponent: () =>
            import('./src/app/page/admin/admin').then((m) => m.Admin),
        });
      } else {
        routes.push({
          path: 'user',
          loadComponent: () =>
            import('./src/app/page/user/user').then((m) => m.User),
        });
      }
      return routes;
    },
  },
];
