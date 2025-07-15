import {
  ApplicationConfig,
  Component,
  provideZonelessChangeDetection,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule, provideRouter, withHashLocation, withRouterConfig } from '@angular/router';
import { routes } from '../routes';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withHashLocation() , withRouterConfig({
      onSameUrlNavigation: 'reload'
    })),
    provideAnimations(),
  ],
};

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  template: `
     <router-outlet>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App, appConfig);
