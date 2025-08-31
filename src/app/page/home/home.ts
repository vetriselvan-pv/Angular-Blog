import {
  CommonModule,
  formatCurrency,
  formatDate,
  formatNumber,
  formatPercent,
} from "@angular/common";
import {
  Component,
  effect,
  inject,
  model,
  resource,
  signal,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  imports: [FormsModule, CommonModule],
  template: `
    <div class="flextable">
      <div class="flex-item"><span>Formatted Date : </span>{{ date }}</div>
      <div class="flex-item">
        <span>Formatted Amount : </span>
        {{ amount }}
      </div>
      <div class="flex-item">
        <span>Formatted Percentage : </span>
        {{ percentage }}
      </div>
      <div class="flex-item">
        <span>Formatted Number : </span>
        {{ number }}
      </div>
    </div>
    <div class="user-input">
      <input type="text" [(ngModel)]="userText" />

      <button (click)="send()" class="btn-primary">Send</button>
    </div>
    <button (click)="nav()">Navigate</button>
  `,
  styles: `
  .flextable {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  .flex-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  `,
})
export class Home {
  date = formatDate(new Date(), "dd/MM/yyyy", "en-US");
  amount = formatCurrency(1000, "en-US", "$", "USD");
  percentage = formatPercent(1 / 100, "en-US");
  number = formatNumber(976544567.8889, "en-US", "1.2-2");
  userText = model<string>("");

  message = resource<string, { userInput: string }>({
    params: (): { userInput: string } => ({
      userInput: this.userText(),
    }),
    stream: ({ params }) => {
      console.log(params);
      return new Promise((resolve) => {
        const messageSignal = signal<string[]>([]);
        const socket = new WebSocket("ws://localhost:8080");
        console.log(params["userInput"]);
        socket.onmessage = (event) => {
          resolve(event.data);
          // messageSignal.update((prev) => [...prev , event.data]);
          // resolve(messageSignal());
        };
        socket.onopen = () => {
          socket.send("Hello Server");
        };
      });
    },
  });

  private route = inject(Router);

  constructor() {}

  send() {}
  nav() {
    this.route.navigate(["login"]);
  }
}
