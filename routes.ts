import { Routes } from '@angular/router';
import { Login } from './src/app/page/login/login';
import { routerDeactivateGuard } from './src/app/guard/router-deactivate/router-deactivate-guard';

export const routes: Routes = [
  {
    path: 'reactive-form',
    loadComponent: () =>
      import('./src/app/page/reactive-form-login/reactive-form-login').then(
        (m) => m.ReactiveFormLogin
      ),
    canDeactivate: [routerDeactivateGuard],
  },
  {
    path : 'dashboard',
    loadComponent: () =>
      import('./src/app/page/dashboard/dashboard').then(
        (m) => m.Dashboard
      ),
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'roles',
    loadChildren: () => ROLES_ROUTES,
  },  
  {
    path: 'registration',
    loadComponent : () =>
      import('./src/app/page/registration/registration').then(
        (m) => m.Registration
      ),
      canDeactivate: [routerDeactivateGuard],
  },
  {
    path: '',
    redirectTo: '/dashboard',
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
