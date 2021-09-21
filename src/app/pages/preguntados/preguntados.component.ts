import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css'],
  providers: [MessageService],
})
export class PreguntadosComponent{

  preguntas =[
    {
      pregunta:'¿Cuánto duró la Guerra de los Cien Años?', 
      opciones:[
        '98 años',
        '100 años',
        '104 años',
        '116 años'
      ],
      correcta: '116 años'
    },
    {
      pregunta:'¿Cuál es el monte más alto del mundo?', 
      opciones:[
        'Kanchenjunga',
        'Everest',
        'Manaslu',
        'Lhotse I'
      ],
      correcta: 'Everest'
    },
    {
      pregunta:'¿Cuál es la lengua más hablada del mundo?', 
      opciones:[
        'Chino Mandarín',
        'Español',
        'Ingles',
        'Latin'
      ],
      correcta: 'Chino Mandarín'
    },
    {
      pregunta:'¿Qué cordillera separa Europa de Asia?', 
      opciones:[
        'Los Aplaches',
        'Los Alpes',
        'Los Andes',
        'Los Urales'
      ],
      correcta: 'Los Urales'
    },
    {
      pregunta:'¿Cuál es la ciudad más poblada de África?', 
      opciones:[
        'El cairo',
        'Nairobi',
        'Luanda',
        'Pretoria'
      ],
      correcta: 'El cairo'
    }
  ] 

  jugando;
  preguntaNro;

  constructor(private messageService: MessageService) { 
    this.preguntaNro = this.getRandomNumber(0,4,this.preguntaNro);
    this.jugando = true;
  }

  validarRespuesta(correcta,opcion){
    if(this.jugando){
      if(correcta == opcion){
        this.showToast("bien groso!!","success" );
      }
      else{
        this.showToast("A estudiar...","error" );
      }
    }
    this.jugando = false;
  }

  reserGame(){
    this.preguntaNro = this.getRandomNumber(0,4,this.preguntaNro);
    this.jugando = true;
  }

  showToast(message: string, color: string ) {
    this.messageService.add({
      key: 'bc',
      severity: color,
      detail: message,
    });
  }

  getRandomNumber(min, max, except) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return (num === except ) ? this.getRandomNumber(min, max, except) : num;
  }

}
