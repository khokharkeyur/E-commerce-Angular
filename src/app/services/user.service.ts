import { Injectable } from '@angular/core';
import { Login, SignUP } from '../interfases';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
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
        console.log('response', response);
        if (response && response.body) {
          localStorage.setItem('user', JSON.stringify(response.body[0]));
          this.router.navigate(['/']);
          // const userFound = response.find(
          //   (item: any) => item.email === user.email && item.password === user.password
          // );
          // if (userFound) {
          //   localStorage.setItem('user', JSON.stringify(userFound));
          //   this.router.navigate(['/']);
          // }
        }
      });
  }
  userAuthReaload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
}
