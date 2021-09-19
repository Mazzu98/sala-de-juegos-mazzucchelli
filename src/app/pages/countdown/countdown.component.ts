import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css'],
  providers: [MessageService],
})
export class CountdownComponent implements OnInit {
  @ViewChild('btnEmpezar') btnEmpezar: ElementRef;
  @ViewChild('btnDetener') btnDetener: ElementRef;

  countS;
  countM;
  intervalSId;
  intervalMId;
  constructor(public messageService: MessageService,private rend: Renderer2) {
    this.countS = 0;
    this.countM = 0;
  }

  ngOnInit(): void {}

  startCount() {
    this.rend.setProperty(this.btnDetener.nativeElement,'disabled',false);
    this.rend.setProperty(this.btnEmpezar.nativeElement,'disabled',true);
    this.countS = 0;
    this.countM = 0;
    this.intervalSId = setInterval(() => {
      this.countS++;
    }, 1000);
    this.intervalMId = setInterval(() => {
      this.countM++;
      if(this.countM == 100)
      {
        this.countM = 0;
      }
    }, 10);
  }

  stopCounter(){
    this.rend.setProperty(this.btnEmpezar.nativeElement,'disabled',false);
    this.rend.setProperty(this.btnDetener.nativeElement,'disabled',true);
    clearInterval(this.intervalMId);
    clearInterval(this.intervalSId);
/*     this.countS = 5;
    this.countM = 0; */
    if(this.countS == 5 && this.countM == 0){
      setTimeout(()=>{
        this.showToast("Ganaste pibe!","success");
      },500);
    }
    else{
      setTimeout(()=>{
        this.showToast("Mal ahi, intenta de nuevo","error");
      },500);
    }
  }
  
  showToast(message: string, color: string) {
    this.messageService.add({
      key: 'bc',
      severity: color,
      detail: message,
    });
  }
}
