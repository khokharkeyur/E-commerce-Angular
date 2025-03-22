import { priceSummary } from './../interfases';
import { Component, inject } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Cart } from '../interfases';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  imports: [],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent {
  cartData: Cart[] = [];
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    total: 0,
    tex: 0,
    delivery: 0,
  };
  Product = inject(ProductService);
  router = inject(Router);
  ngOnInit(): void {
    this.Product.currentCart().subscribe((data) => {
      this.cartData = data;
      let price = 0;
      data.forEach((element) => {
        if (element.quantity) {
          price += Number(element.price * element.quantity);
        }
      });
      this.priceSummary.price = price;
      this.priceSummary.discount = price/10;
      this.priceSummary.tex = price/10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + this.priceSummary.tex + this.priceSummary.delivery - this.priceSummary.discount;
    });
  }
  checkout() {
    this.router.navigate(['/checkout']);
  }
}
