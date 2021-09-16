import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AhorcadoRoutingModule } from './ahorcado-routing.module';
import { ToastModule } from 'primeng/toast';
import { AhorcadoComponent } from './ahorcado.component';

@NgModule({
  declarations: [AhorcadoComponent],
  imports: [
    CommonModule,
    AhorcadoRoutingModule,
    ToastModule
  ]
})
export class AhorcadoModule { }
