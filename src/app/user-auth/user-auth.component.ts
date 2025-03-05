import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cart, Login, Product, SignUP } from '../interfases';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  imports: [FormsModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',
})
export class UserAuthComponent {
  user = inject(UserService);
  product = inject(ProductService);
  authError: string = '';
  showLogin: boolean = false;

  ngOnInit() {
    this.user.userAuthReaload();
  }

  signUp(data: SignUP) {
    this.user.userSignUp(data);
  }

  login(data: Login): void {
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((response) => {
      if (response) {
        this.authError = 'Invalid email or password';
      } else {
        this.localCartToRemote();
      }
    });
  }

  openLogin(): void {
    this.showLogin = !this.showLogin;
  }
  localCartToRemote(): void {
    let data = localStorage.getItem('cart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: Product[] = JSON.parse(data);
      cartDataList.forEach((product, index) => {
        let cartData: Cart = {
          ...product,
          productId: product.id,
          userId,
        };
        delete cartData.id;
        setTimeout(() => {
          this.product.addTocard(cartData).subscribe((response) => {
            if (response) {
              console.log(response);
            }
          });
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('cart');
          }
        }, 500);
      });
    }

    setTimeout(() => {
      this.product.getCartList(userId);
    }, 2000);
  }
}
