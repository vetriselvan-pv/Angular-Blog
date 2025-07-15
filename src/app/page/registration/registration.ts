import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-registration",
  imports: [ReactiveFormsModule],
  template: `
    <div class="form-header">
      <h1>Registration</h1>
    </div>
    <form autocomplete="off" [formGroup]="registrationForm" (ngSubmit)="submit()">
      <div class="form-container">
        <div class="form-field">
          <label>First Name</label>
          <input formControlName="firstName" type="text" />
        </div>
        <div class="form-field">
          <label>Last Name</label>
          <input formControlName="lastName" type="text" />
        </div>
        <div class="form-field">
          <label>Email</label>
          <input autocomplete="new-password" autocorrect="off" autocapitalize="off" formControlName="email" type="email" />
        </div>
        <div class="form-field">
          <label>Password</label>
          <input autocorrect="off" autocapitalize="off" spellcheck="false" autocomplete="new-password" formControlName="password" type="password" />
        </div>
        <div class="form-field">
          <label>Confirm Password</label>
          <input formControlName="confirmPassword" type="password" />
        </div>
        <div class="form-field">
          <label>Phone Number</label>
          <input formControlName="phone" type="text" />
        </div>
      </div>
      <div class="button-container">
        <button type="button" (click)="cancel()">Cancel</button>
        <button type="submit" [disabled]="registrationForm.invalid">
          Register
        </button>
      </div>
    </form>
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
  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
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
export class Registration {

  submitted : boolean = false;
  private router : Router = inject(Router);

  registrationForm : FormGroup = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
    confirmPassword: new FormControl(""),
    phone: new FormControl(""),
  });

  submit() {
    this.submitted = true;
    console.log(this.registrationForm.value);
  }

  cancel(){
    this.submitted = true;
    this.router.navigate(["/login"]);
  }

  hasUserChanges() {
    return this.registrationForm.dirty && !this.submitted;
  }
}
