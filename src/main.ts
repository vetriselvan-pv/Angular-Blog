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
import { SessionIdleMonitor } from "./app/service/session-idle-monitor/session-idle-monitor";
import { IdleSession } from "./app/component/idle-session/idle-session";

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
  template: ` 
  <router-outlet></router-outlet>
    `,
})
export class App {
  name = "Angular";
  private router = inject(Router);
  private history: string[] = [];
  private sessionIdleMonitor = inject(SessionIdleMonitor);

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
