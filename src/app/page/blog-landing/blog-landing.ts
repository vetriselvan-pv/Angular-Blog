import { Component, effect, inject } from '@angular/core';
import { IdleSession } from '../../component/idle-session/idle-session';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { SessionIdleMonitor } from '../../service/session-idle-monitor/session-idle-monitor';

@Component({
  selector: 'app-blog-landing',
  imports: [RouterModule, IdleSession],
  templateUrl: './blog-landing.html',
  styleUrl: './blog-landing.scss'
})
export class BlogLanding {
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
