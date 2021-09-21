import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css'],
  providers: [MessageService],
})
export class PreguntadosComponent{

  pregunta = {
    pregunta:'Cuantos litros puede tomar un borracho?', 
    opciones:[
      '10',
      '3',
      '7',
      '15'
    ],
    correcta: '10'
  };

  constructor() { }

}
