import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from './../classes/user.class';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  isLogged: any = false;
  userName: any;
  
  constructor(private afAuth: AngularFireAuth, private router: Router) {
    afAuth.authState.subscribe((user) => (this.isLogged = user));
    afAuth.onAuthStateChanged((user: any) => {
        let array = user?.multiFactor.user.email.split('@');
        if(typeof array !== "undefined"){
          this.userName = array[0];
        }
      });
  }

  login(user: User) {
      return this.afAuth.signInWithEmailAndPassword(user.email, user.password);
  }

  register(user: User) {
      return this.afAuth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
  }

  logout(){
    this.afAuth.signOut();
    this.router.navigateByUrl('/login');
  }

}
