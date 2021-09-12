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
  @ViewChild('btnM') btnM : ElementRef;
  @ViewChild('btnm') btnm : ElementRef;
  @ViewChild('btnr') btnr : ElementRef;

  cards;
  mainCardNumber;
  guessCardNumber;
  isPlaying;
  constructor(private renderer: Renderer2, private messageService: MessageService) {
    this.isPlaying = false;
    this.cards = [1,2,3,4,5,6,7,8,9,10,11,12]
    this.mainCardNumber = this.getRandomNumber(1,12,0);
    this.guessCardNumber = this.getRandomNumber(1,12,this.mainCardNumber);
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
    if(!this.isPlaying){
      this.isPlaying = true;
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
        this.renderer.setProperty(this.btnr.nativeElement, 'disabled', false);
        this.renderer.setProperty(this.btnM.nativeElement, 'disabled', true);
        this.renderer.setProperty(this.btnm.nativeElement, 'disabled', true);
        this.isPlaying = false;
      },2500);
    }
  }

  reserGame(){
    this.mainCardNumber = this.getRandomNumber(1,12,0);
    this.renderer.removeClass(this.mainCard.nativeElement,'hide');
    this.renderer.addClass(this.guessCard.nativeElement,'hide');
    setTimeout(()=>{
      this.guessCardNumber = this.getRandomNumber(1,12,this.mainCardNumber);
    },1200)
    this.renderer.setProperty(this.btnM.nativeElement, 'disabled', false);
    this.renderer.setProperty(this.btnm.nativeElement, 'disabled', false);
    this.renderer.setProperty(this.btnr.nativeElement, 'disabled', true);
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

  ngAfterViewInit(){
    this.renderer.setProperty(this.btnr.nativeElement, 'disabled', true);
  }

}
