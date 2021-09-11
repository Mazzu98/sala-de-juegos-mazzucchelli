import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messages:any;
  message: any;

  constructor(private chatS: ChatService) { 
    this.messages = chatS.items;
  }

  send(){
    let message = {
      text: this.message,
      date: "15:30",
      user: "Invitado"
    }
    this.chatS.sendMessage(message).then(()=>{
      this.message = "";
    });
  }

  ngOnInit(): void {
  }

}
