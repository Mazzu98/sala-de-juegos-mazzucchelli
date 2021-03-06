import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './pages/chat/chat.component';
import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { QuienSoyComponent } from './pages/quien-soy/quien-soy.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './services/guard.guard';


const routes: Routes = [
  {path: '', redirectTo: '/login',pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent,},
  {path: 'quien-soy', component: QuienSoyComponent},
  {path: 'chat', component: ChatComponent, canActivate:[AuthGuard]},
  {path: 'ahorcado', loadChildren: ()=> import('./pages/ahorcado/ahorcado.module').then(m=> m.AhorcadoModule)},
  {path: 'mayoromenor', loadChildren: ()=> import('./pages/mayomenor/mayomenor.module').then(m=> m.MayomenorModule)},
  {path: 'acierta', loadChildren: ()=> import('./pages/countdown/countdown.module').then(m=> m.CountdownModule)},
  {path: 'preguntados', loadChildren: ()=> import('./pages/preguntados/preguntados.module').then(m=> m.PreguntadosModule)},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 