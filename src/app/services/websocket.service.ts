import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
interface Usuario {
  nombre: string;
}
@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  public socketStatus: boolean = false;
  public usuario!: Usuario;
  constructor(private _socket: Socket) {
    this.checkStatus();
  }
  public checkStatus(): void {
    this._socket.on('connect', () => {
      console.log('conectado al servidor');
      this.socketStatus = true;
    });
    this._socket.on('disconnect', () => {
      console.log('desconectado del servidor');
      this.socketStatus = false;
    });
  }
  public emit(evento: string, payload?: any, callback?: Function): void {
    this._socket.emit(evento, payload, callback);
  }
  public listen(evento: string): Observable<any> {
    return this._socket.fromEvent(evento);
  }
  public login(nombre: string) {
    console.log('configurando', nombre);
    this.emit('configurar-usuario', { nombre }, (response: any) => {
      console.log(response);
    });
    // this._socket.emit('configurar-usuario', { nombre }, (response: any) => {
    //   console.log(response);
    // });
  }
}
