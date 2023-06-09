import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';
import { UsuarioGuard } from './guards/usuario.guard';
const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'mensajes',
    component: MensajesComponent,
    canActivate: [UsuarioGuard],
  },
  {
    path: '**',
    component: LoginComponent,
  },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
