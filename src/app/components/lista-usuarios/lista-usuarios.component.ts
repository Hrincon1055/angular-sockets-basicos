import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css'],
})
export class ListaUsuariosComponent implements OnInit {
  public usuariosActivos$!: Observable<any>;
  constructor(public chatService: ChatService) {}

  ngOnInit(): void {
    this.usuariosActivos$ = this.chatService.getUsuariosActivos();
    this.chatService.emitirUsuariosActivos();
  }
}
