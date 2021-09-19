import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountdownRoutingModule } from './countdown-routing.module';
import { CountdownComponent } from './countdown.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [CountdownComponent],
  imports: [
    CommonModule,
    CountdownRoutingModule,
    ToastModule
  ]
})
export class CountdownModule { }
