import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUP } from '../interfases';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}
  userSignUp(data: SignUP) {
    this.http
      .post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((response) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(response.body));
        console.log(response);
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
}
