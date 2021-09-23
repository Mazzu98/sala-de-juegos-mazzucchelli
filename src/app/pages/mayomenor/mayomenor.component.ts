import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApisService } from 'src/app/services/apis.service';

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

  mainCardTest = {img:'', value:0};
  guessCardTest = {img:'', value:0};
  constructor(private renderer: Renderer2, private messageService: MessageService, private apiS: ApisService) {
    
  }

  ngOnInit(): void {
    this.isPlaying = false;
    this.cardsFill();
  }

  cardsFill(){
    this.apiS.setUrl('https://deckofcardsapi.com/api/deck/new/draw/?count=2');
    this.apiS.apiCall().subscribe((ret:any)=>{
      this.cardManage(ret.cards[0],this.mainCardTest);
      this.cardManage(ret.cards[1],this.guessCardTest);
    });
  }

  cardManage(objCard, fillVar){
    fillVar.img = objCard.image;
    if(objCard.value == "ACE"){
      fillVar.value = 1;
    }
    else if(objCard.value == "JACK"){
      fillVar.value = 11;
    }
    else if (objCard.value == "QUEEN"){
      fillVar.value = 12;

    }
    else if(objCard.value == "KING"){
      fillVar.value = 13;
    }
    else{
      fillVar.value = parseInt(objCard.value);
    }
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
        if(this.guessCardTest.value == this.mainCardTest.value){
          this.showToast('Empate!', 'warn');
        }
        else{
          if(valor == 'mayor'){
            if(this.guessCardTest.value > this.mainCardTest.value){
              this.showToast('Ganaste Crack!', 'success');
            }
            else{
              this.showToast('Perdiste bro', 'error');
            }
          }
          else if(valor == 'menor'){
            if(this.guessCardTest.value < this.mainCardTest.value){
              this.showToast('Ganaste Crack!', 'success');
            }
            else{
              this.showToast('Perdiste bro', 'error');
            }
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
    this.cardsFill();
    this.renderer.removeClass(this.mainCard.nativeElement,'hide');
    this.renderer.addClass(this.guessCard.nativeElement,'hide');
    this.renderer.setProperty(this.btnM.nativeElement, 'disabled', false);
    this.renderer.setProperty(this.btnm.nativeElement, 'disabled', false);
    this.renderer.setProperty(this.btnr.nativeElement, 'disabled', true);
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
