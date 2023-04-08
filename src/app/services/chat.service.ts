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
      de: this.websocketService.getUsuario()?.nombre,
      cuerpo: mensaje,
    };
    this.websocketService.emit('mensaje', payload);
  }
  public getMessages(): Observable<any> {
    return this.websocketService.listen('mensaje-nuevo');
  }
  public getMessagesPrivate(): Observable<any> {
    return this.websocketService.listen('mensaje-privado');
  }
  public getUsuariosActivos(): Observable<any> {
    return this.websocketService.listen('usuarios-activos');
  }
  public emitirUsuariosActivos(): void {
    this.websocketService.emit('obtener-usuarios');
  }
}
