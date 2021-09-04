import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user.class';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService],
})
export class RegisterComponent implements OnInit {

  user: User;

  constructor(private router:Router, private auth:AuthService, private messageService: MessageService ) { 
    this.user = new User();
  }

  ngOnInit(): void {
  }

  login(){
    this.router.navigateByUrl("/login");
  }

  register(){
    if (this.user.email == '' || this.user.password == '') {
      this.showError("Campos vacios");
    } 
    else if (!this.validateEmail(this.user.email)) {
      this.showError("mail invalido");
    } 
    else {
    this.auth.register(this.user).then(()=>{
      this.router.navigateByUrl("/home");
    })
    .catch((error)=>{
      if(error.code == 'auth/email-already-in-use'){
        this.showError("El Email ya esta en uso");
      }
      else if(error.code == 'auth/weak-password'){
        this.showError("La contraseña debe tener al menos 6 caracteres");
      }
      else{
        this.showError("No se pudo registrar");
      }
    });
    }
  }

  validateEmail(mail: string) {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (re.test(mail)) {
      return true;
    }
    else{
      return false;
    }
  }

  showError(error: string) {
    this.messageService.add({
      key: 'bc',
      severity: 'error',
      summary: 'error',
      detail: error,
    });
  }

}
