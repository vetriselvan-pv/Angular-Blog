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
  Router,
  RouterModule,
  provideRouter,
  withHashLocation,
  withRouterConfig,
} from "@angular/router";
import { routes } from "../routes";
import { provideAnimations } from "@angular/platform-browser/animations";
import { LocalPort } from "./app/service/local-port";
import { of } from "rxjs";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withHashLocation(),
      withRouterConfig({
        onSameUrlNavigation: "reload",
      })
    ),
    provideAnimations(),
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
  template: ` <router-outlet> </router-outlet> `,
})
export class App {
  name = "Angular";
  private router = inject(Router);
  constructor() {
    effect(() => {
      console.log('Current Navigation : ',this.router.currentNavigation());
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
