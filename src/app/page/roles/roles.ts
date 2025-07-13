import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-roles',
  imports: [RouterModule],
  template: `
    <p>
      You are in Roles Component
    </p>
    <button (click)="navigateToAdmin()">Admin</button>
    <button (click)="navigateToUser()">User</button>
    <router-outlet />
  `,
  styles: ``,
})
export class Roles {
  private router = inject(Router);
  navigateToAdmin() {
    this.router.navigate(['roles', 'admin']);
  }
  navigateToUser() {
    this.router.navigate(['roles', 'user']);
  }
}
