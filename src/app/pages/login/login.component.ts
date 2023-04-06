import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public nombre: string = '';
  constructor(
    private _websocketServic: WebsocketService,
    private _router: Router
  ) {}

  ngOnInit(): void {}
  public ingresar() {
    this._websocketServic.login(this.nombre).then((response) => {
      console.log('login.component LINE 16 =>', response);
      this._router.navigateByUrl('/mensajes');
    });
  }
}
