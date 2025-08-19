import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  imports: [ CommonModule ],
  template: `
    <p>
    You are logged in as admin
    </p>
    <p>
      {{
        date | date: 'dd/MM/YYYY'
      }}
    </p>
  `,
  styles: ``,
  host: {
    '[style.color]': 'color',
    '[style.font-size.px]': 'fontSize',
  }
})
export class Admin {
  color = 'red';
  fontSize = 16;
  date = new Date();
}
