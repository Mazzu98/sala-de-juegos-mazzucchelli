import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messages:any;
  message: any;

  constructor(private chatS: ChatService, public auth:AuthService) { 
    this.messages = chatS.items;
    console.log((new Date()).getMinutes());
  }

  send(){
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

  ngOnInit(): void {
  }

}
