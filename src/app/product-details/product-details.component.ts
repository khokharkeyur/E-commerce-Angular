import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../interfases';

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
      });
  }
  handleQuantity(value: string): void {
    if (this.productQuantity < 20 && value === 'plus') {
      this.productQuantity++;
    } else if (this.productQuantity > 1 && value === 'min') {
      this.productQuantity--;
    }
  }
  AddToCard() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData);
      }
    }
  }
}
