import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalPort {

  worker = new SharedWorker("./worker.js");


  allowedPort = [4200, 4201, 4202 ];

  constructor() { 
    this.worker.port.start();
    this.worker.port.onmessage = (event) => {
      console.log("Message from another tab:", event.data);
    };
  }

  sendMessage(message: string) {
    this.worker.port.postMessage(message);
  }

  getMessage(): ((this: MessagePort, ev: MessageEvent) => any) | null {
    return this.worker.port.onmessage;
  }
}
