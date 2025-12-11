import { AfterViewInit, Component, signal } from "@angular/core";
import { Typing } from "../../../directive/typing/typing";

@Component({
  selector: "app-home",
  imports: [Typing],
  templateUrl: "./home.html",
  styleUrl: "./home.scss",
})
export class Home implements AfterViewInit {
  doodles = signal<string[]>([
    "./skill_icon/angular.svg",
    "./skill_icon/capacitor.svg",
    "./skill_icon/css-3.svg",
    "./skill_icon/html.svg",
    "./skill_icon/ionic.svg",
    "./skill_icon/javascript.svg",
    "./skill_icon/node-js.svg",
  ]);

  ngAfterViewInit(): void {
    const doodles: any = document.querySelectorAll(".doodles-animation");

    doodles.forEach((icon: HTMLElement) => {
      const x = Math.random() * 90; // random %
      const y = Math.random() * 90;

      icon.style.left = x + "%";
      icon.style.top = y + "%";
    });
  }
}
