import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MayomenorRoutingModule } from './mayomenor-routing.module';
import { MayomenorComponent } from './mayomenor.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [MayomenorComponent],
  imports: [
    CommonModule,
    MayomenorRoutingModule,
    ToastModule
  ]
})
export class MayomenorModule { }
