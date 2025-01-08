import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUP } from '../interfases';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  constructor(private http: HttpClient) {}
  userSignUp(data: SignUP) {
    console.log('call the api');

    return this.http.post('http://localhost:3000/seller', data);
  }
}
