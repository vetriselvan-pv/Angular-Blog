import {
  Component,
  Input,
  OnInit,
  effect,
  forwardRef,
  inject,
  input,
  model,
  signal,
} from "@angular/core";
import {
  ControlContainer,
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { startWith } from "rxjs";

@Component({
  selector: "app-common-text-box",
  template: ` 
    <div
      class="common-text-box"
      [class.success]="success()"
      [class.error]="errorMessage() && isTouched()"
      [class.focused]="isFocused()"
      [class.has-value]="!!value()"
    >
      <div class="input-wrapper">
        <input
          [id]="inputId()"
          type="text"
          class="form-control"
          [attr.aria-label]="ariaLabel() || label()"
          [attr.aria-required]="required()"
          [attr.aria-invalid]="error() ? 'true' : 'false'"
          [attr.aria-describedby]="error() ? errorId() : null"
          [disabled]="disabled()"
          [(ngModel)]="value"
          (input)="onInput($event)"
          (focus)="onFocus()"
          (blur)="onBlur()"
        />
        <label
          [attr.for]="inputId()"
          class="floating-label"
          [class.floated]="isFocused() || value()"
        >
          {{ placeholder() || label() }} @if(required()){
          <span aria-hidden="true">*</span>
          }
        </label>
      </div>
      @if(errorMessage() && !isFocused() && isTouched()){
      <span [id]="errorId()" class="error-message" role="alert">{{
        errorMessage()
      }}</span>
      }
    </div>
  `,
  styles: `
    .common-text-box {
      margin-bottom: 1.5rem;
    }
    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }
    .form-control {
      width: 100%;
      padding: 1.2rem 1rem 0.6rem 1rem;
      border: 2px solid #ccc;
      border-radius: 6px;
      font-size: 1rem;
      background: #fff;
      transition: border-color 0.2s, box-shadow 0.2s;
      outline: none;
    }
    .common-text-box.focused .form-control {
      border-color: #1976d2;
      box-shadow: 0 0 0 2px #1976d233;
    }
    .common-text-box.success .form-control {
      border-color: #2e7d32;
    }
    .common-text-box:has(.error) .form-control[aria-invalid='true'] {
      border-color: #b00020;
    }
    .floating-label {
      position: absolute;
      left: 1rem;
      top: 1.1rem;
      font-size: 1rem;
      color: #aaa;
      pointer-events: none;
      transition: all 0.2s;
      background: #fff;
      padding: 0 0.25em;
      z-index: 2;
      opacity: 1;
    }
    .floating-label.floated {
      top: -0.7rem;
      left: 0.8rem;
      font-size: 0.85rem;
      color: #1976d2;
      background-color: #fff;
      padding: 0 0.25em;
      opacity: 1;
    }
    .error-message {
      color: #b00020;
      font-size: 0.9em;
      margin-top: 0.25rem;
      display: block;
    }
    .visually-hidden { position: absolute; width: 1px; height: 1px; margin: -1px; border: 0; padding: 0; overflow: hidden; clip: rect(0 0 0 0); }
  `,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CommonTextBox),
      multi: true,
    },
  ],
})
export class CommonTextBox implements ControlValueAccessor, OnInit {
  label = input.required();
  ariaLabel = input("");
  placeholder = input.required();
  formControlName = input.required<string>();

  required = signal<boolean>(false);
  error = signal<Object | null>(null);
  success = signal<boolean>(false);
  disabled = signal<boolean>(false);
  isFocused = signal<boolean>(false);
  isTouched = signal<boolean>(false);

  errorMessage = signal<string>("");
  errorId = signal<string>("");
  inputId = signal<string>("");

  value = model("");

  controlContainer = inject(ControlContainer);

  private onChange: (value: string) => void = (value: string) => {};
  public onTouched: () => void = () => {};

  writeValue(obj: any): void {
    this.value.set(obj || "");
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  constructor() {
    effect(() => {
      const errors = this.error();
      const keys = Object.keys(errors || {});
      if (keys.length && errors) {
        this.errorMessage.set(keys[0]);
        this.errorId.set(`${this.formControlName()}_${keys[0]}`);
      } else {
        this.errorMessage.set("");
        this.errorId.set("");
      }
    });
  }

  ngOnInit(): void {
    const control = this.controlContainer.control?.get(this.formControlName());
    console.log(control);
    this.required.set(control?.hasValidator(Validators.required) || false);
    this.inputId.set(`${this.formControlName()}_input`);
    control?.statusChanges.pipe(startWith(control.status)).subscribe({
      next: (res) => {
        console.log(res);
        this.error.set(control.errors);
      },
    });
  }

  onInput(event: Event): void {
    this.onChange(this.value());
  }

  onFocus(): void {
    this.isFocused.set(true);
  }

  onBlur(): void {
    this.isFocused.set(false);
    this.onTouched();
    this.isTouched.set(true);
  }
}
