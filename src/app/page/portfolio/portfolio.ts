import {
  AfterViewInit,
  Component,
  DOCUMENT,
  inject,
  OnInit,
  signal,
} from "@angular/core";
import {
  RouterOutlet,
  RouterLinkWithHref,
  RouterLinkActive,
} from "@angular/router";

@Component({
  selector: "app-portfolio",
  imports: [RouterOutlet, RouterLinkWithHref, RouterLinkActive],
  templateUrl: "./portfolio.html",
  styleUrls: ["./portfolio.scss"],
})
export class Portfolio implements AfterViewInit {
  private document = inject(DOCUMENT);
  mobileMenuOpen = signal<boolean>(false);
  navList = signal<
    Array<{
      name: string;
      link: string;
    }>
  >([
    {
      name: "Home",
      link: "home",
    },
    {
      name: "About",
      link: "about",
    },
    {
      name: "Skills",
      link: "skills",
    },
    {
      name: "Contact",
      link: "contact",
    },
    {
      name: "Blogs",
      link: "blogs",
    },
  ]);



  ngAfterViewInit(): void {
  
  }

  screenMaximize() {
    if (this.document && !this.document.fullscreenElement) {
      const elem: any = this.document.documentElement;
      if (elem.requestFullscreen) {
        elem
          .requestFullscreen()
          .catch((err: any) => console.error("Fullscreen error:", err));
      } else if (elem.webkitRequestFullscreen) {
        // Safari
        elem
          .webkitRequestFullscreen()
          .catch((err: any) => console.error("Fullscreen error:", err));
      } else if (elem.msRequestFullscreen) {
        // old IE/Edge
        elem
          .msRequestFullscreen()
          .catch((err: any) => console.error("Fullscreen error:", err));
      }
    } else if (this.document && this.document.fullscreenElement) {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if ((this.document as any).webkitExitFullscreen) {
        // Safari
        (this.document as any).webkitExitFullscreen();
      } else if ((this.document as any).msExitFullscreen) {
        // old IE/Edge
        (this.document as any).msExitFullscreen();
      }
    }
  }
}
