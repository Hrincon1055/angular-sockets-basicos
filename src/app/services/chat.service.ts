import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(public websocketService: WebsocketService) {}
  public sendMessage(mensaje: string): void {
    const payload = {
      de: 'Henry R',
      cuerpo: mensaje,
    };
    this.websocketService.emit('mensaje', payload);
  }
  public getMessages(): Observable<any> {
    return this.websocketService.listen('mensaje-nuevo');
  }
}
