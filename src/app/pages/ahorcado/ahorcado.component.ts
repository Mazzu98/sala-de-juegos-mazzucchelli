import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css'],
  providers: [MessageService],
})
export class AhorcadoComponent implements OnInit, AfterViewInit {

  @ViewChild('letters') letters : ElementRef;
  @ViewChild('head') head : ElementRef;
  @ViewChild('body') body : ElementRef;
  @ViewChild('leftArm') leftArm : ElementRef;
  @ViewChild('rigthArm') rigthArm : ElementRef;
  @ViewChild('leftLeg') leftLeg : ElementRef;
  @ViewChild('rigthLeg') rigthLeg : ElementRef;

  keys;
  word;
  words;
  errorLetters;
  failTriesCont;
  hitsCont;
  refsToReset = [];
  constructor(public render: Renderer2, private messageService:MessageService) {
    this.hitsCont = 0;
    this.failTriesCont = 0;
    this.keys = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    this.words = ['angular','pacman','firebase','typescript'];
    this.word = this.getRadomWord(this.words).split('');
    this.errorLetters = [];
  }

  getRandomNumber(min, max) {
    return Math.floor( Math.random() * (max - min) + min);
  }

  getRadomWord(words){
    let rand = this.getRandomNumber(0,words.length);
    return words[rand];
  }

  keyClick(refEl,key:string){
    let success = false;
    if(this.checkTries()){
      this.render.setProperty(refEl, 'disabled', true);
      this.refsToReset.push(refEl);
      for(let i = 0; i < this.letters.nativeElement.childNodes.length ; i++){
        let element = this.letters.nativeElement.childNodes[i];
        if(element.lastChild !== null){
          if(element.childNodes[0].innerText.trim() == key){
            this.hitsCont ++;
            this.render.removeClass(element.childNodes[0],'d-none');
            this.render.addClass(element.childNodes[0],'d-flex');
            success = true;
          }
        }
      }
      if(this.hitsCont == this.word.length){
        this.showToast('Ganaste CRACK!', 'success');
      }
      if(!success){
        this.failTriesCont ++;
        this.personDraw(this.failTriesCont);
        this.errorLetters.push(key);
        if(this.failTriesCont == 6){
          this.showToast('Perdiste PA!','error');
        }
      }
    }
  }

  personDraw(count){
    switch(count){
      case 1: this.render.removeClass(this.head.nativeElement,'d-none');
              this.render.addClass(this.head.nativeElement,'d-blok');
              break;
      case 2: this.render.removeClass(this.body.nativeElement,'d-none');
              this.render.addClass(this.body.nativeElement,'d-blok');
              break;
      case 3: this.render.removeClass(this.leftArm.nativeElement,'d-none');
              this.render.addClass(this.leftArm.nativeElement,'d-blok');
              break;                      
      case 4: this.render.removeClass(this.rigthArm.nativeElement,'d-none');
              this.render.addClass(this.rigthArm.nativeElement,'d-blok');
              break;   
      case 5: this.render.removeClass(this.leftLeg.nativeElement,'d-none');
              this.render.addClass(this.leftLeg.nativeElement,'d-blok');
              break; 
      case 6: this.render.removeClass(this.rigthLeg.nativeElement,'d-none');
              this.render.addClass(this.rigthLeg.nativeElement,'d-blok');
              break;                  
    }
  }

  checkTries(){
    if(this.failTriesCont < 6){
      return true;
    }
    else{
      return false;
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
  }

  showToast(message: string, color: string ) {
    this.messageService.add({
      key: 'bc',
      severity: color,
      detail: message,
    });
  }

  resetGame(){
    this.hitsCont = 0;
    this.failTriesCont = 0;
    this.word = this.getRadomWord(this.words).split('');
    this.errorLetters = [];

    for(let i = 0; i < this.letters.nativeElement.childNodes.length ; i++){
      let element = this.letters.nativeElement.childNodes[i];
      if(element.lastChild !== null){
        this.render.addClass(element.childNodes[0],'d-none');
      }
    }
    this.refsToReset.forEach(element => {
      this.render.setProperty(element, 'disabled', false);
    });

    this.render.addClass(this.head.nativeElement,'d-none');
    this.render.addClass(this.body.nativeElement,'d-none');
    this.render.addClass(this.leftArm.nativeElement,'d-none');
    this.render.addClass(this.rigthArm.nativeElement,'d-none');
    this.render.addClass(this.leftLeg.nativeElement,'d-none');
    this.render.addClass(this.rigthLeg.nativeElement,'d-none');


  }


}
