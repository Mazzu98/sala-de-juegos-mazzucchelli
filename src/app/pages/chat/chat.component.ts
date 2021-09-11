import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { Renderer2 } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked{

  @ViewChild("chat") chat: ElementRef;

  messages:any;
  message: any;

  constructor(private chatS: ChatService, public auth:AuthService, route:Router, private render: Renderer2) { 
    this.messages = chatS.items;
    this.scrollToBottom();
  }

  send(){
    let timeNow = this.formatDate(new Date());
    let message = {
      text: this.message,
      date: timeNow,
      user: this.auth.userName
    }
    this.chatS.sendMessage(message).then(()=>{
      this.message = "";
      this.scrollToBottom();
    });
  }

  EnterSubmit($event){
    if($event.key == "Enter"){
      this.send();
    }
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

  formatDate(date: Date){
    let hours = date.getHours();
    let minutes =  date.getMinutes();
    let time;
    if(minutes < 10){
      time = hours + ":0" + minutes; 
    }
    else{
      time = hours + ":" + minutes; 
    }
    
    return time;
  }

}
