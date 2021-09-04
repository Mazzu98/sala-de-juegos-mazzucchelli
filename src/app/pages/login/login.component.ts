import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user.class';
import { AuthService } from 'src/app/services/auth.service';
import { UserRegisterService } from 'src/app/services/user-register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  user: User;

  constructor( private auth:AuthService, private router: Router, public afs: UserRegisterService) {
      this.user = new User();
  }

  ngOnInit(){
  }

  login(){
    this.auth.login(this.user).then(()=>{
      let date = new Date();
      this.afs.userRegistrer({fecha: this.getDateFormat(date), usuario: this.auth.userName});
      this.router.navigateByUrl("/home");
    })
    .catch(()=>{
      
    });
  }

  register(){
    this.router.navigateByUrl("/register");
  }

  fastLogin(){
    this.user.email = "invitado@invitado.com";
    this.user.password = "123456";
  }

  getDateFormat(date: Date){
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  }


}
