import { Injectable } from '@angular/core';
import {io}  from 'socket.io-client';
// possibly need to do npm install @types/socket.io-client
import { Observable } from 'rxjs';
// possibly no working import { Observable } from 'rxjs/Observable'


@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {
  private url = 'http://localhost:3000';
  private socket;

  constructor() {
   this.socket = io(this.url);
  }

  sendMessage(message:any) {
    this.socket.emit('add-message', message);
  }

  getMessages() {
    let observablesMessage = new Observable(

      observer => {
          this.socket = io(this.url);

          this.socket.on('message', (data) => {
            observer.next(data);
          });

          return() => {
            this.socket.disconnect();
          };
    });
    return observablesMessage;
  }
}