import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public nombre: string = '';
  constructor(private _websocketServic: WebsocketService) {}

  ngOnInit(): void {}
  public ingresar() {
    this._websocketServic.login(this.nombre);
  }
}
