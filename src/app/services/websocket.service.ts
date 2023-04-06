import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
interface Usuario {
  nombre: string;
  sala: string;
}
@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  public socketStatus: boolean = false;
  public usuario!: Usuario | null;
  constructor(private _socket: Socket) {
    this.cargarStorage();
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
  public login(nombre: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this.emit('configurar-usuario', { nombre }, (response: any) => {
        this.usuario = { nombre: nombre, sala: 'sin-sala' };
        this.guardarStorage();
        resolve(response);
      });
    });
    // this._socket.emit('configurar-usuario', { nombre }, (response: any) => {
    //   console.log(response);
    // });
  }
  public guardarStorage(): void {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }
  public cargarStorage() {
    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario')!);
      this.login(this.usuario?.nombre!);
    }
  }
  public getUsuario(): Usuario | null {
    return this.usuario;
  }
}
