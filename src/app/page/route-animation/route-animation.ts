import { Component, Input, numberAttribute } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-route-animation',
  imports: [RouterLink],
  template: `
   <button [routerLink]="'/route-animation/' + (count + 1)" replaceUrl="true">Increment</button>
   <button [routerLink]="'/login'"  >Navigate</button>
   <div class="count">{{count}}</div>
  `,
  styles: `.count {
      font-family: sans-serif;
      text-align: center;
      position: absolute;
      inset: 50% 0 auto;
      transform: translateY(-50%);
      font-size: 25vw;
      view-transition-name: count;
    }`
})
export class RouteAnimation {
  @Input({ transform: numberAttribute }) count!: number;
}
