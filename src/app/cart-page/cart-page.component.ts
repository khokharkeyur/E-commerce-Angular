import { Component, inject } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Cart } from '../interfases';

@Component({
  selector: 'app-cart-page',
  imports: [],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent {
  cartData: Cart[] = [];
  Product = inject(ProductService);
  ngOnInit(): void {
    this.Product.currentCart().subscribe((data) => {
      this.cartData = data;
    });
  }
}
