import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { SignUP } from '../interfases';

@Component({
  selector: 'app-seller-auth',
  imports: [FormsModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css',
})
export class SellerAuthComponent {
  constructor(private seller: SellerService) {}
  showLogin: boolean = false;
  authError: string | boolean = false;
  ngOnInit(): void {
    this.seller.reloadSeller();
  }
  signUp(data: SignUP): void {
    this.seller.userSignUp(data);
  }
  login(data: SignUP): void {
    this.authError = "";
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((error)=>{
      if (error) {
        console.log("called");
        this.authError = "Email or Password is not correct";
      }
    })
  }
  openLogin(): void {
    this.showLogin = !this.showLogin;
  }
}
