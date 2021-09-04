import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user.class';
import { AuthService } from 'src/app/services/auth.service';
import { UserRegisterService } from 'src/app/services/user-register.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  user: User;

  registroForm = new FormGroup({});

  constructor(
    private auth: AuthService,
    private router: Router,
    public afs: UserRegisterService,
    public messageService: MessageService
  ) {
    this.user = new User();
  }

  ngOnInit() {}

  login() {
    if (this.user.email == '' || this.user.password == '') {
      this.showError("Campos vacios");
    } 
    else if (!this.validateEmail(this.user.email)) {
      this.showError("mail invalido");
    } 
    else {
      this.auth
        .login(this.user)
        .then(() => {
          let date = new Date();
          this.afs.userRegistrer({
            fecha: this.getDateFormat(date),
            usuario: this.auth.userName,
          });
          this.router.navigateByUrl('/home');
        })
        .catch(() => {
          this.showError("Alguno de los datos es incorrecto");
        });
    }
  }

  register() {
    this.router.navigateByUrl('/register');
  }

  fastLogin() {
    this.user.email = 'invitado@invitado.com';
    this.user.password = '123456';
  }

  getDateFormat(date: Date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
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


  ngAfterViewOnInit() {}
}
