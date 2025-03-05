import { EventEmitter, Injectable } from '@angular/core';
import { Login, SignUP } from '../interfases';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  invalidUserAuth = new EventEmitter<boolean>();
  constructor(private http: HttpClient, private router: Router) {}
  userSignUp(user: SignUP) {
    console.log('user', user);
    this.http
      .post('http://localhost:3000/user', user, { observe: 'response' })
      .subscribe((response) => {
        console.log('response', response);
        if (response) {
          localStorage.setItem('user', JSON.stringify(response.body));
          this.router.navigate(['/']);
        }
      });
  }
  userLogin(user: Login) {
    this.http
      .get<SignUP[]>(
        `http://localhost:3000/user?emial=${user.email}&password=${user.password}`,
        { observe: 'response' }
      )
      .subscribe((response) => {
        if (response && response.body?.length) {
          this.invalidUserAuth.emit(false);
          localStorage.setItem('user', JSON.stringify(response.body[0]));
          this.router.navigate(['/']);
        } else {
          this.invalidUserAuth.emit(true);
        }
      });
  }
  userAuthReaload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
}
