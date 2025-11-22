import { Injectable, signal } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import {
  distinctUntilChanged,
  fromEvent,
  map,
  merge,
  startWith,
  Subject,
  switchMap,
  takeUntil,
  timer,
} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SessionIdleMonitor {
  // in my case i'm watching the user is idle for 5 min

  private IDLETIMEOUTMS = 1000 * 60 * 1;

  // IN the last 1 min i'm going to open a popup and intimate the user that you are idle for so long .
  private COUNTDOWNTIMEMS = 1000 * 30;

  // To update the state as true when user is idle and false when active
  public readonly IDLESTATE = signal<boolean>(false);

  // Used to emit the remaning time
  public readonly COUNTDOWN = signal<number>(0);

  // Used to stop the countdown timer
  private stopCountdown$ = new Subject<void>();

  private idleState$ = toObservable(this.IDLESTATE);
  private countDown$ = toObservable(this.COUNTDOWN);

  constructor() {
    this.initIdleMonitor();
  }

  initIdleMonitor() {
    merge(
      fromEvent(window, "mousemove"),
      fromEvent(window, "keydown"),
      fromEvent(window, "click"),
      fromEvent(window, "scroll"),
      fromEvent(window, "touchstart")
    )
      .pipe(
        startWith(null),
        switchMap(() => {
          return timer(this.IDLETIMEOUTMS);
        }),
        map(() => true),
        distinctUntilChanged()
      )
      .subscribe((isIdle) => {
        console.log(isIdle)
        this.IDLESTATE.set(isIdle);
        if (isIdle) {
          this.startCountDown();
        }
      });
  }

  startCountDown() {
    const totalSeconds = this.COUNTDOWNTIMEMS / 1000;

    timer(0, 1000)
      .pipe(
        map((tick) => totalSeconds - tick),
        takeUntil(this.stopCountdown$),
        takeUntil(
          this.countDown$.pipe(
            map((val) => val <= 0) 
          )
        )
      )
      .subscribe({
        next: (remainingTime: number) => {
          this.COUNTDOWN.set(remainingTime);
          if (remainingTime <= 0) {
            this.resetTimer();
          }
        },
      });
  }

  resetTimer() {
    // 1. Stop the countdown
    this.stopCountdown$.next();

    // 2. Reset the countdown display
    this.COUNTDOWN.set(this.COUNTDOWNTIMEMS / 1000);

    // 3. Mark the user as active
    this.IDLESTATE.set(false);
  }
}
