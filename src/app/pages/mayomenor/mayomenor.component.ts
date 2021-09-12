import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mayomenor',
  templateUrl: './mayomenor.component.html',
  styleUrls: ['./mayomenor.component.css'],
  providers: [MessageService],
})
export class MayomenorComponent implements OnInit {

  @ViewChild('mainCard') mainCard : ElementRef;
  @ViewChild('guessCard') guessCard : ElementRef;

  cards;
  mainCardNumber;
  guessCardNumber;
  constructor(private renderer: Renderer2, private messageService: MessageService) {
    this.cards = [1,2,3,4,5,6,7,8,9,10,11,12]
    this.mainCardNumber = this.getRandomNumber(1,12,0);
    this.guessCardNumber = this.getRandomNumber(1,12,this.mainCardNumber);
    console.log(this.mainCardNumber);
    console.log(this.guessCardNumber);
  }

  ngOnInit(): void {
  }

  showHide(){
    this.renderer.addClass(this.mainCard.nativeElement,'shaking');
    setTimeout(()=>{
      this.renderer.removeClass(this.mainCard.nativeElement,'shaking');
      setTimeout(()=>{
        this.renderer.addClass(this.mainCard.nativeElement,'hide');
        this.renderer.removeClass(this.guessCard.nativeElement,'hide');
      },50)
    },1500);
  }

  mayoromenor(valor:string){
    this.showHide();
    setTimeout(()=>{
      if(valor == 'mayor'){
        if(this.guessCardNumber > this.mainCardNumber){
          this.showToast('Ganaste Crack!', 'success');
        }
        else{
          this.showToast('Perdiste bro', 'error');
        }
      }
      else if(valor == 'menor'){
        if(this.guessCardNumber < this.mainCardNumber){
          this.showToast('Ganaste Crack!', 'success');
        }
        else{
          this.showToast('Perdiste bro', 'error');
        }
      }
    },2500);
  }

  getRandomNumber(min, max, except) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return (num === except ) ? this.getRandomNumber(min, max, except) : num;
  }

  showToast(message: string, color: string ) {
    this.messageService.add({
      key: 'bc',
      severity: color,
      detail: message,
    });
  }

}
