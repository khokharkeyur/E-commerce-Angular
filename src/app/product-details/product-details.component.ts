import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Cart, Product } from '../interfases';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  productData: undefined | Product;
  productQuantity: number = 1;
  removeProduct: boolean = false;
  cartData: Product[] = [];

  activeRoute = inject(ActivatedRoute);
  product = inject(ProductService);

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    productId &&
      this.product.getProduct(productId).subscribe((result) => {
        this.productData = result;
        let cartData = localStorage.getItem('cart');
        if (productId && cartData) {
          let cart = JSON.parse(cartData);
          let existingProduct = cart.find(
            (item: Product) => item.id === productId
          );
          if (existingProduct) {
            console.log('existingProduct', existingProduct);
            this.removeProduct = true;
          } else {
            this.removeProduct = false;
          }
        }
        let user = localStorage.getItem('user');
        if (user) {
          let userId = user && JSON.parse(user).id;
          this.product.getCartList(userId);
          this.product.cardData.subscribe((response) => {
            if (response) {
              let existingProduct = response.find(
                (item: Product) => item.productId === productId
              );
              if (existingProduct) {
                this.cartData.push(existingProduct);
                this.removeProduct = true;
              } else {
                this.removeProduct = false;
              }
            }
          });
        }
      });
  }
  handleQuantity(value: string): void {
    if (this.productQuantity < 20 && value === 'plus') {
      this.productQuantity++;
    } else if (this.productQuantity > 1 && value === 'min') {
      this.productQuantity--;
    }
  }
  addToCard() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData);
        this.removeProduct = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: Cart = {
          ...this.productData,
          userId,
          productId: this.productData.id,
          quantity: this.productData.quantity ?? 1,
        };
        delete cartData.id;
        this.product.addTocard(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);
            this.removeProduct = true;
          }
        });
      }
    }
  }
  removeToCard(productId: string) {
    if (!localStorage.getItem('user')) {
      this.product.removeToCartInLocal(productId);
    } else {
      console.log('cartData', this.cartData[0]);
      this.product.removeToCart(this.cartData[0].id).subscribe((result) => {
        if (result) {
          this.product.getCartList(this.cartData[0].userId);
        }
      });
    }
    this.removeProduct = false;

  }
}
