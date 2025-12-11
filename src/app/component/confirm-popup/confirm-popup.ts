import { Component, inject } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-popup',
  imports: [],
  template: `
     <div class="confirm-popup">
      <h1>Confirm Popup</h1>
      <p>Are you sure you want to leave this page?</p>
      <div class="btn-wrapper">
        <button type="button" class="btn btn-primary" (click)="confirm()">Confirm</button>
        <button type="button" class="btn btn-danger" (click)="cancel()">Cancel</button>
      </div>
     </div>
  `,
  styles: `
    .confirm-popup {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .btn-wrapper {
      display: flex;
      gap: 10px;
      justify-content: space-between;
      align-items: center;
      .btn {
        width: 100%;
        height: 30px;
        border-radius: 5px;
        border: none;
        cursor: pointer; 
      }
      .btn-primary {
        background-color: #007bff;
        color: #fff;
      }
      .btn-danger {
        background-color: #dc3545;
        color: #fff;
      }
    } 
  `
})
export class ConfirmPopup {

  private matDialogRef : MatDialogRef<ConfirmPopup> = inject(MatDialogRef)
  
  confirm() {
    this.matDialogRef.close(true);
  }
  cancel() {
    this.matDialogRef.close(false);
  }
}
