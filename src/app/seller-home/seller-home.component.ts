import { Component, inject } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../interfases';

@Component({
  selector: 'app-seller-home',
  imports: [],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css',
})
export class SellerHomeComponent {
  productList: Product[] | undefined;
  product = inject(ProductService);
  ngOnInit(): void {
    this.product.productList().subscribe((response) => {
      console.log('response', response);
      this.productList = response;
    });
  }
}
