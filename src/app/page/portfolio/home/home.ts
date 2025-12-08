import { Component } from '@angular/core';
import { Typing } from '../../../directive/typing/typing';

@Component({
  selector: 'app-home',
  imports: [Typing],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
