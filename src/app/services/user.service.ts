import { Injectable } from '@angular/core';
import { SignUP } from '../interfases';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}
  userSignUp(user: SignUP) {
    console.log('user', user);
    this.http.post('http://localhost:3000/user', user, { observe: 'response' }).subscribe
    ((response) => {
      console.log('response', response);
      if (response) {
        localStorage.setItem('user', JSON.stringify(response.body));
        this.router.navigate(['/']);
      }
    });
  }
}
