import { Routes } from "@angular/router";
import { Login } from "./src/app/page/login/login";
import { routerDeactivateGuard } from "./src/app/guard/router-deactivate/router-deactivate-guard";
import { Renderer } from "./src/app/page/renderer/renderer";

export const routes: Routes = [
  {
    path: "blog",
    loadComponent: () =>
      import("./src/app/page/blog-landing/blog-landing").then(
        (m) => m.BlogLanding
      ),
    loadChildren: () => [
      {
        path: "reactive-form",
        loadComponent: () =>
          import("./src/app/page/reactive-form-login/reactive-form-login").then(
            (m) => m.ReactiveFormLogin
          ),
        canDeactivate: [routerDeactivateGuard],
      },
      {
        path: "dashboard",
        loadComponent: () =>
          import("./src/app/page/dashboard/dashboard").then((m) => m.Dashboard),
      },
      {
        path: "login",
        component: Login,
      },
      {
        path: "admin",
        loadComponent: () =>
          import("./src/app/page/admin/admin").then((m) => m.Admin),
      },
      {
        path: "renderer",
        component: Renderer,
      },
      {
        path: "roles",
        loadChildren: () => ROLES_ROUTES,
      },
      {
        path: "registration",
        loadComponent: () =>
          import("./src/app/page/registration/registration").then(
            (m) => m.Registration
          ),
        canDeactivate: [routerDeactivateGuard],
      },
      {
        path: "home",
        loadComponent: () =>
          import("./src/app/page/home/home").then((m) => m.Home),
      },
      {
        path: "operator",
        loadComponent: () =>
          import("./src/app/page/operator/operator").then((m) => m.Operator),
      },
      {
        path: "template-literals",
        loadComponent: () =>
          import("./src/app/page/template-literals/template-literals").then(
            (m) => m.TemplateLiterals
          ),
      },
      {
        path: "animation",
        loadComponent: () =>
          import("./src/app/page/animation/animation").then((m) => m.Animation),
      },
      {
        path: "route-animation",
        loadComponent: () =>
          import("./src/app/page/route-animation/route-animation").then(
            (m) => m.RouteAnimation
          ),
      },
      {
        path: "common-form",
        loadComponent: () =>
          import("./src/app/page/common-form/common-form").then(
            (m) => m.CommonForm
          ),
      },
      {
        path: "signal-form",
        loadComponent: () =>
          import("./src/app/page/signal-form/signal-form").then(
            (m) => m.SignalForm
          ),
      },
      {
        path: "js-operator",
        loadComponent: () =>
          import("./src/app/page/js-operator/js-operator").then(
            (m) => m.JsOperator
          ),
      },
    ],
  },
  {
    path: "portfolio",
    loadComponent: () =>
      import("./src/app/page/portfolio/portfolio").then((m) => m.Portfolio),
    loadChildren: () => [
      {
        path: "home",
        loadComponent: () =>
          import("./src/app/page/portfolio/home/home").then((m) => m.Home),
      },
      {
        path : 'skills',
        loadComponent : () => import('./src/app/page/portfolio/skills/skills').then((m) => m.Skills)
      },
      {
        path : 'contact',
        loadComponent : () => import('./src/app/page/portfolio/profile/profile').then((m) => m.Profile)
      },
      {
        path : 'blogs',
        loadComponent : () => import('./src/app/page/portfolio/blog/blog').then((m) => m.Blog)
      }
    ],
  },
  {
    path: "",
    redirectTo: "/portfolio/home",
    pathMatch: "full",
  },
];

export const ROLES_ROUTES = [
  {
    path: "",
    loadComponent: () =>
      import("./src/app/page/roles/roles").then((m) => m.Roles),
    loadChildren: () => {
      let routes = [];
      if (localStorage.getItem("role") === "admin") {
        routes.push({
          path: "admin",
          loadComponent: () =>
            import("./src/app/page/admin/admin").then((m) => m.Admin),
        });
      } else {
        routes.push({
          path: "user",
          loadComponent: () =>
            import("./src/app/page/user/user").then((m) => m.User),
        });
      }
      return routes;
    },
  },
];
