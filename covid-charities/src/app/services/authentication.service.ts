import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Account } from '../model/account';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public account: Account = new Account('', [], [], [], [], '', '');
  private authState: Observable<firebase.User>;
  public currentUser: firebase.User = null;
  ready = new EventEmitter();

  public loggedIn = false;
  public errMsg = '';

  constructor(private router: Router, private angularFireAuth: AngularFireAuth) {
    this.authState = angularFireAuth.authState;

    this.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
        console.log('Successfully authenticated');
        console.log('AUTHSTATE USER', user);
        this.loggedIn = true;
        this.account.email = this.currentUser.email;
        console.log('this.account.email', JSON.stringify(this.currentUser));
      } else {
        console.log('AUTHSTATE USER EMPTY', user);
        this.currentUser = null;
      }
    },
      err => {
       console.log('Something went wrong with authState: ', err);
      });
  }

  signUp(email: string, password: string) {
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed up!', res);
        this.router.navigate(['/login']);
      })
      .catch(error => {
        console.log('Something went wrong: ', error.message);
        this.errMsg = error.message;
      });
  }

  signIn(email: string, password: string) {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed in!');
        this.router.navigate(['/']);
        this.loggedIn = true;
      })
      .catch(error => {
        console.log('Something went wrong: ', error.message);
      });
  }

  signOut() {
    this.angularFireAuth.signOut().then(() => {
      this.router.navigate(['/']);
    });

    this.loggedIn = false;
    location.reload();
    console.log('Signed Out');
  }

  // resetPassword(email: string) {
  //   this.angularFireAuth.chang
  // }

  getLogInStatus() {
    return this.loggedIn;
  }
}