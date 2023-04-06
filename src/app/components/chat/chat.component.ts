import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  public texto: string = '';
  private mensajes$!: Subscription;
  private mensajesPrivado$!: Subscription;
  public mensajes: any[] = [];
  public elemento!: HTMLElement;
  constructor(public chatService: ChatService) {}
  ngOnDestroy(): void {
    this.mensajes$.unsubscribe();
    this.mensajesPrivado$.unsubscribe();
  }

  ngOnInit(): void {
    this.elemento = document.getElementById('chact-mensajes')!;
    this.mensajes$ = this.chatService.getMessages().subscribe({
      next: (mensaje) => {
        this.mensajes.push(mensaje);
        setTimeout(() => {
          this.elemento.scrollTop = this.elemento.scrollHeight;
        }, 50);
      },
    });
    this.mensajesPrivado$ = this.chatService.getMessagesPrivate().subscribe({
      next: (mensaje) => {
        console.log('chat.component LINE 33 =>', mensaje);
        this.mensajes.push(mensaje);
        setTimeout(() => {
          this.elemento.scrollTop = this.elemento.scrollHeight;
        }, 50);
      },
    });
  }
  public enviar() {
    if (this.texto.trim() === '') return;
    this.chatService.sendMessage(this.texto);
    this.texto = '';
  }
}
