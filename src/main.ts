import {
  ApplicationConfig,
  Component,
  effect,
  inject,
  provideAppInitializer,
  provideZonelessChangeDetection,
} from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import {
  NavigationStart,
  Router,
  RouterModule,
  provideRouter,
  withComponentInputBinding,
  withHashLocation,
  withRouterConfig,
  withViewTransitions,
} from "@angular/router";
import { routes } from "../routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withHashLocation(),
      withRouterConfig({
        onSameUrlNavigation: "reload",
      }),
      withViewTransitions(),
      withComponentInputBinding()
    ),
    // provideAppInitializer(() => {
    //     return new Promise((resolve) => {
    //       setTimeout(() => {
    //         resolve(true);
    //       }, 5000);
    //     });
    // }),
  ],
};

@Component({
  selector: "app-root",
  imports: [RouterModule],
  template: ` <header class="header-nav">
      <div class="nav-container">
        <div class="brand">
          <a routerLink="/" class="brand-link">Angular Blog</a>
        </div>
        <nav class="nav-menu">
          <ul class="nav-list">
            <li class="nav-item">
              <a routerLink="/home" routerLinkActive="active" class="nav-link"
                >Home</a
              >
            </li>
            <li class="nav-item">
              <a routerLink="/login" routerLinkActive="active" class="nav-link"
                >Login</a
              >
            </li>
            <li class="nav-item">
              <a
                routerLink="/dashboard"
                routerLinkActive="active"
                class="nav-link"
                >Dashboard</a
              >
            </li>
            <li class="nav-item">
              <a
                routerLink="/animation"
                routerLinkActive="active"
                class="nav-link"
                >Animation</a
              >
            </li>
            <li class="nav-item">
              <a
                routerLink="/operator"
                routerLinkActive="active"
                class="nav-link"
                >Operators</a
              >
            </li>
            <li class="nav-item">
              <a
                routerLink="/signal-form"
                routerLinkActive="active"
                class="nav-link"
                >Signal Form</a
              >
            </li>
          </ul>
        </nav>
        <div class="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
    <main class="main-content">
      <div class="page-container">
        <router-outlet></router-outlet>
      </div>
    </main>`,
})
export class App {
  name = "Angular";
  private router = inject(Router);
  private history: string[] = [];

  constructor() {
    effect(() => {
      console.log("Current Navigation : ", this.router.currentNavigation());
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const goingBack = this.history.includes(event.url);
        document.documentElement.classList.toggle("back", goingBack);
        document.documentElement.classList.toggle("forward", !goingBack);

        if (!goingBack) {
          this.history.push(event.url);
        } else {
          this.history = this.history.slice(
            0,
            this.history.indexOf(event.url) + 1
          );
        }
      }
    });
  }
}

bootstrapApplication(App, appConfig);

// provideAppInitializer(() => {
//   const localportService = inject(LocalPort);
//   localportService.sendMessage("Hello from main.ts");
//   return of(true);
// }),

/** 
 *  initialize the application based the port number.
 *  if the port number is not in the allowed port list, then throw an error.
 *  if the port number is in the allowed port list, then return true. 
 * 
 * provideAppInitializer(() => {
  const localportService = inject(LocalPort);
  const port = window.location.port;
  if(!localportService.allowedPort.includes(Number(port))) {
   throw new Error('Invalid port'); 
  }
  return of(true);
}),
 */
