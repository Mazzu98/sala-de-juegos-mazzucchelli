import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreguntadosRoutingModule } from './preguntados-routing.module';
import { PreguntadosComponent } from './preguntados.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [PreguntadosComponent],
  imports: [
    CommonModule,
    PreguntadosRoutingModule,
    ToastModule
  ]
})
export class PreguntadosModule { }
