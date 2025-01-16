import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Login, SignUP } from '../interfases';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}
  userSignUp(data: SignUP) {
    this.http
      .post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((response) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(response.body));
        this.router.navigate(['/seller-home']);
      });
  }
  reloadSeller() {
    const seller = localStorage.getItem('seller');
    if (seller) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['/seller-home']);
    }
  }
  userLogin(data: Login) {
    console.log(data);
    this.http
      .get(
        `http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((response: any) => {
        if (response && response?.body && response?.body?.length) {
          localStorage.setItem('seller', JSON.stringify(response.body));
          this.router.navigate(['/seller-home']);
        } else {
          console.log('Login Failed');
          this.isLoginError.emit(true)
        }
      });
  }
}
