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
  productMessage: string | undefined;
  product = inject(ProductService);
  ngOnInit(): void {
    this.featchProductData();
  }

  featchProductData() {
    this.product.productList().subscribe((response) => {
      if (response) {
        this.productList = response;
      }
    });
  }

  deleteProduct(id: string) {
    this.product.deleteProduct(id).subscribe((response) => {
      if (response) {
        this.productMessage = 'Product is deleted';
        this.featchProductData();
      }
      setTimeout(() => {
        this.productMessage = '';
      }, 3000);
    });
  }
}
