import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  OnDestroy,
  AfterViewInit,
  NgZone
} from '@angular/core';

@Directive({
  selector: '[appTyping]'
})
export class Typing implements AfterViewInit, OnDestroy {
  @Input('appTyping') texts: string | string[] = ''; // main input (string or array)
  @Input() typeSpeed = 80;      // ms per character when typing
  @Input() backSpeed = 50;      // ms per character when deleting
  @Input() startDelay = 300;    // ms before starting first typing
  @Input() backDelay = 1200;    // ms to wait after typing full string before deleting
  @Input() loop = true;         // loop through texts
  @Input() cursorChar = '│';    // cursor character
  @Input() cursorClass = 'typing-cursor'; // css class for cursor span
  @Input() smartBackspace = true; // if multiple texts, delete only difference (optional)
  @Input() ariaLive = 'polite'; // 'off' | 'polite' | 'assertive'

  private mounted = false;
  private running = false;
  private destroyRequested = false;
  private timeouts: any[] = [];
  private cursorEl?: HTMLElement;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    if (this.mounted) return;
    this.mounted = true;

    // ensure texts is an array
    const textsArr = Array.isArray(this.texts) ? this.texts : [this.texts ?? ''];

    // set aria-live if requested (helps screen readers)
    if (this.ariaLive && this.ariaLive !== 'off') {
      this.renderer.setAttribute(this.el.nativeElement, 'aria-live', this.ariaLive);
    }

    // create cursor element
    this.cursorEl = this.renderer.createElement('span');
    this.renderer.addClass(this.cursorEl, this.cursorClass);
    this.renderer.setStyle(this.cursorEl, 'display', 'inline-block');
    this.renderer.setProperty(this.cursorEl, 'textContent', this.cursorChar);
    // append cursor after content
    this.renderer.appendChild(this.el.nativeElement, this.cursorEl);

    // run typing loop outside Angular to avoid triggering change detection too often
    this.ngZone.runOutsideAngular(() => {
      this.schedule(this.startDelay, () => {
        if (!this.destroyRequested) {
          this.running = true;
          this.loopTexts(textsArr).catch(() => {});
        }
      });
    });
  }

  // main loop: type each item then optionally delete
  private async loopTexts(textsArr: string[]) {
    let idx = 0;
    const total = textsArr.length;

    // infinite loop until destroyed or loop=false and last item processed
    while (!this.destroyRequested) {
      const target = textsArr[idx % total];
      await this.typeString(target);

      if (this.destroyRequested) break;

      // wait after typed
      await this.delay(this.backDelay);

      if (this.destroyRequested) break;

      if (this.loop || idx + 1 < total) {
        await this.deleteString(target, textsArr[(idx + 1) % total]);
      } else {
        // not looping and last item: stop (leave text shown)
        break;
      }

      idx++;
    }

    this.running = false;
  }

  // types a full string into element (character-by-character)
  private async typeString(target: string) {
    const el = this.el.nativeElement;
    const current = this.getCurrentText();

    // if current already equals target, skip typing
    if (current === target) {
      return;
    }

    // type from current length (use smartBackspace only for multi texts)
    let startIndex = 0;
    if (this.smartBackspace && current) {
      // start from first differing char
      while (
        startIndex < current.length &&
        startIndex < target.length &&
        current[startIndex] === target[startIndex]
      ) {
        startIndex++;
      }
      // set initial text to the common prefix
      const prefix = target.slice(0, startIndex);
      this.setText(prefix);
    } else {
      this.setText('');
      startIndex = 0;
    }

    for (let i = startIndex; i <= target.length; i++) {
      if (this.destroyRequested) return;
      const substr = target.slice(0, i);
      this.setText(substr);
      await this.delay(this.typeSpeed);
    }
  }

  // deletes current string; if nextText provided and smartBackspace=true, will keep common prefix
  private async deleteString(currentText: string, nextText?: string) {
    const el = this.el.nativeElement;
    const cur = this.getCurrentText();

    // determine how many chars to remove (smartBackspace: keep common prefix)
    let keep = 0;
    if (this.smartBackspace && nextText != null) {
      while (
        keep < cur.length &&
        keep < nextText.length &&
        cur[keep] === nextText[keep]
      ) {
        keep++;
      }
    }

    for (let i = cur.length; i >= keep; i--) {
      if (this.destroyRequested) return;
      const substr = cur.slice(0, i - 1 >= 0 ? i - 1 : 0);
      this.setText(substr);
      await this.delay(this.backSpeed);
    }
  }

  // helper: read current text (exclude cursor text)
  private getCurrentText(): string {
    const full = this.el.nativeElement.textContent ?? '';
    const cursor = this.cursorChar ?? '';
    // remove last occurrence of cursorChar if present
    if (full.endsWith(cursor)) {
      return full.slice(0, full.length - cursor.length);
    }
    return full;
  }

  // helper: set text content preserving cursor element
  private setText(text: string) {
    // remove existing text nodes except cursor
    const native = this.el.nativeElement;

    // remove all child nodes except cursorEl
    const children = Array.from(native.childNodes);
    for (const node of children) {
      if (node === this.cursorEl) continue;
      this.renderer.removeChild(native, node);
    }

    // insert text node
    const textNode = this.renderer.createText(text);
    this.renderer.insertBefore(native, textNode, this.cursorEl ?? null);
  }

  // schedule setTimeout and track handles for cleanup
  private schedule(ms: number, cb: () => void) {
    const id = setTimeout(cb, ms);
    this.timeouts.push(id);
    return id;
  }

  private delay(ms: number) {
    return new Promise<void>((resolve) => {
      const id = setTimeout(() => {
        // remove timeout id
        this.timeouts = this.timeouts.filter(t => t !== id);
        resolve();
      }, ms);
      this.timeouts.push(id);
    });
  }

  ngOnDestroy(): void {
    this.destroyRequested = true;
    for (const t of this.timeouts) {
      clearTimeout(t);
    }
    this.timeouts = [];
    // remove cursor element
    if (this.cursorEl) {
      try { this.renderer.removeChild(this.el.nativeElement, this.cursorEl); } catch {}
    }
  }
}
