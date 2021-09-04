import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user.class';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;

  constructor(private router:Router, private auth:AuthService) { 
    this.user = new User();
  }

  ngOnInit(): void {
  }

  login(){
    this.router.navigateByUrl("/login");
  }

  register(){
    this.auth.register(this.user).then(()=>{
      this.router.navigateByUrl("/home");
    })
    .catch(()=>{
      
    });
  }

}
