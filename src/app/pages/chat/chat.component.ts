import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { Renderer2 } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked{

  @ViewChild("chat") chat: ElementRef;

  messages:any;
  message: any;

  constructor(private chatS: ChatService, public auth:AuthService, private render: Renderer2) { 
    this.messages = chatS.items;
    this.scrollToBottom();
  }

  send(){
    this.chat.nativeElement.scrollTop = -100;
    let now = new Date();
    let timeNow = now.getHours() + ":" + now.getMinutes();
    let message = {
      text: this.message,
      date: timeNow,
      user: this.auth.userName
    }
    this.chatS.sendMessage(message).then(()=>{
      this.message = "";
    });
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
  } 

  scrollToBottom(): void {
    try {
        this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight;
    } catch(err) { }                 
  }

  ngOnInit(): void {
  }

}
