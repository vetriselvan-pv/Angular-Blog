import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form-login',
  imports: [ReactiveFormsModule],
  template: `
    <div class="main-wrapper">
    <div class="form-container">
         <div class="logo-container">
        Login
      </div>
       <form [formGroup]="loginForm" (ngSubmit)="submit()" class="form">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text"  formControlName="username" placeholder="Enter your username"  >
          @if(loginForm.get('username')?.touched && loginForm.get('username')?.errors?.['required']) {
            <span class="error-message">Username is required</span>
          }
        </div>
         <div class="form-group">
          <label for="password">Password</label>
          <input type="text" formControlName="password" placeholder="Enter your password"  >
          @if(loginForm.get('password')?.touched && loginForm.get('password')?.errors?.['required']) {
            <span class="error-message">Password is required</span>
          }
        </div>
        <div class="flex-row">
          <button class="form-submit-btn" type="reset">Reset</button>
          <button class="form-submit-btn" type="submit">Submit</button>
        </div>
      </form> 
       
    </div>
</div>
  `,
  styles: `
  .invalid {
  border: 1px solid red !important;
}

.pending {
   border: 1px solid orange !important;
}

.main-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100dvw;
  height: 100dvh;
  background: #EEAECA;
background: radial-gradient(circle,rgba(238, 174, 202, 0.96) 0%, rgba(148, 187, 233, 1) 100%);
  .form-container {
    width: 500px;
    background-color: #fff;
    padding: 32px 24px;
    font-size: 14px;
    font-family: inherit;
    color: #212121;
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.084),
      0px 2px 3px rgba(0, 0, 0, 0.168);
  }

  .form-container button:active {
    scale: 0.95;
  }

  .form-container .logo-container {
    text-align: center;
    font-weight: 600;
    font-size: 18px;
  }

  .form-container .form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .form-container .form-group {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .form-container .form-group label {
    display: block;
    margin-bottom: 5px;
  }

  .form-container .form-group input {
    padding: 12px 16px;
    border-radius: 6px;
    font-family: inherit;
    border: 1px solid #ccc;
  }

  .form-container .form-group input::placeholder {
    opacity: 0.5;
  }

  .form-container .form-group input:focus {
    outline: none;
    border-color: #1778f2;
  }

  .form-container .form-submit-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: inherit;
    color: #fff;
    background-color: #212121;
    border: none;
    width: 100%;
    padding: 12px 16px;
    font-size: inherit;
    gap: 8px;
    margin: 12px 0;
    cursor: pointer;
    border-radius: 6px;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.084),
      0px 2px 3px rgba(0, 0, 0, 0.168);
  }

  .form-container .form-submit-btn:hover {
    background-color: #313131;
  }

  .form-container .link {
    color: #1778f2;
    text-decoration: none;
  }

  .form-container .signup-link {
    align-self: center;
    font-weight: 500;
  }

  .form-container .signup-link .link {
    font-weight: 400;
  }

  .form-container .link:hover {
    text-decoration: underline;
  }

  .error-message {
    color: red;
    font-size: 12px;
    margin-top: 5px;
  }

  .flex-row {
    display: flex;
    gap: 10px;
  }
}

  `
})
export class ReactiveFormLogin implements OnInit {

  private formBuilder: FormBuilder = inject(FormBuilder);

  loginForm = this.formBuilder.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  ngOnInit() {
    console.log('Login Form Status',this.loginForm.status);
    console.log('Login Form Value',this.loginForm.value);
    console.log('Login Form Valid',this.loginForm.valid);
    console.log('Login Form Invalid',this.loginForm.invalid);
    console.log('Login Form Pristine',this.loginForm.pristine);
    console.log('Login Form Dirty',this.loginForm.dirty);
    console.log('Login Form Touched',this.loginForm.touched);
    console.log('Login Form Untouched',this.loginForm.untouched);
  }

  submit() {
    console.log(this.loginForm.value);
    // handle the form submission here.
  }
  
}
