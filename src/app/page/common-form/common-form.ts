import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonTextBox } from '../../component/common-text-box/common-text-box';

@Component({
  selector: 'app-common-form',
  imports: [ReactiveFormsModule, CommonTextBox],
  template: `
     <form  [formGroup]="form">
     <app-common-text-box label="Name" placeholder="Enter your name " formControlName="name" >

     </app-common-text-box>
     </form>
  `,
  styles: ``
})
export class CommonForm {
  protected fb : FormBuilder = inject(FormBuilder);

  public form = this.fb.nonNullable.group({
    name :  ['',[Validators.required]]
  })



}
