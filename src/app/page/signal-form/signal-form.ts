import { CommonModule } from "@angular/common";
import { Component, effect, signal } from "@angular/core";
import {
  apply,
  Control,
  form,
  minLength,
  required,
  Schema,
  schema,
  validate,
  applyWhen,
  submit,
  TreeValidationResult,
  ValidationError,
  min,
  max,
} from "@angular/forms/signals";
import { Rating } from "../../component/rating/rating";

export interface IRegisterForm {
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  terms: boolean;
  rating : number
}

export const customSchema: Schema<string> = schema((control) => {
  required(control, { message: "Field is required" });
  minLength(control, 3, {
    message: "Field must be at least 3 characters long",
  });
});

@Component({
  selector: "app-signal-form",
  standalone: true,
  imports: [Control, CommonModule, Rating],
  template: `
    <div class="form-header">
      <h1>Registration Form using signals form</h1>
    </div>
    <form autocomplete="off" (submit)="submit($event)">
      <div class="form-container">
        <div class="form-field">
          <label>First Name</label>
          <input [control]="registerForm.firstName" type="text" />
          @if(registerForm.firstName().errors()) { @for(error of
          registerForm.firstName().errors(); track error) {
          <!-- @if(error.kind === 'required'){
                <small class="error-message"> First Name is required </small>
              } -->

          <small class="error-message">{{ error.message }}</small>
          } }
        </div>
        <div class="form-field">
          <label>Last Name</label>
          <input [control]="registerForm.lastName" type="text" />
          @if(registerForm.lastName().errors()) { @for(error of
          registerForm.lastName().errors(); track error) {
          <small class="error-message">{{ error.message }}</small>
          } }
        </div>
        <div class="form-field">
          <label>Gender</label>
          <select [control]="registerForm.gender">
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
        </div>
        <div class="form-field">
          <label>Date of Birth</label>
          <input [control]="registerForm.dob" type="date" />
          @if(registerForm.dob().errors()) { @for(error of
          registerForm.dob().errors(); track error) {
          <small class="error-message">{{ error.message }}</small>
          } }
        </div>
        <div class="form-field">
          <label>Marital Status</label>
          <select [control]="registerForm.maritalStatus">
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
          @if(registerForm.maritalStatus().errors()) { @for(error of
          registerForm.maritalStatus().errors(); track error) {
          <small class="error-message">{{ error.message }}</small>
          } }
        </div>
        <div class="form-field">
          <label>Marriage Date</label>
          <input [control]="registerForm.marriageDate" type="date" />
          @if(registerForm.marriageDate().errors()) { @for(error of
          registerForm.marriageDate().errors(); track error) {
          <small class="error-message">{{ error.message }}</small>
          } }
        </div>
        <div class="form-field">
          <label>
            <input [control]="registerForm.terms" type="checkbox" />
            Accept Terms
          </label>
        </div>
        <div class="form-field">
          <app-rating [control]="registerForm.rating">

          </app-rating>
        </div>
      </div>
      <div class="button-container">
        <button type="button" (click)="clear()">Clear</button>
        <button type="submit">Register</button>
      </div>
    </form>
    {{ registerForm().value() | json }}
  `,
  styles: `
  .form-header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
  }
  .form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }
  .form-field {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 450px;
  }
  form {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 10px;
  }
  label {
    font-size: 14px;
    font-weight: 600;
  }
  input, select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  input.invalid {
    border: 1.5px solid #e74c3c;
    background: #fff6f6;
  }
  .error-message {
    color: #e74c3c;
    font-size: 13px;
    margin-top: 2px;
  }
  button {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    width: 100px;
  }
  button:disabled {
    background-color: #ccc;
    color: #000;
  }
  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 16px;
    gap: 16px;
  }
  `,
})
export class SignalForm {
  readonly register = signal({
    firstName: "",
    lastName: "",
    gender: "M",
    dob: "",
    maritalStatus: "",
    marriageDate: "",
    terms: false,
    rating: 0
  });

  readonly registerForm = form(this.register, (path) => {
    apply(path.firstName, customSchema),
      required(path.marriageDate, {
        when: ({ valueOf }) => valueOf(path.maritalStatus) === "Married",
        message: "Marriage Date is required",
      });
    max(path.rating,3,{ message : 'Should not exceed max value' })
  });

  submit(ev: Event) {
    submit(this.registerForm, async (form) => {  
      // Handle you logics here just to show the error message hardcoded the 
      // error response
        return [
          {
            kind: "formError",
            message: "Form is invalid",
            field:  form.firstName
          },
        ]; 
      // return undefined
    });
    ev.preventDefault();
  }

  clear() {}

  constructor() {
    effect(() => {
      console.log('Rating Control Value : ',this.registerForm.rating().value());
    });
 
  }
}
