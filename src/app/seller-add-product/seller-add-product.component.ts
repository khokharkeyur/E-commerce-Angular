import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../interfases';

@Component({
  selector: 'app-seller-add-product',
  imports: [FormsModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css',
})
export class SellerAddProductComponent {
  addProductMessage: string | undefined;
  product = inject(ProductService);
  addProductSubmit(data: Product) {
    this.product.addProduct(data).subscribe((response) => {
      console.log('response', response);
      if (response) {
        this.addProductMessage = 'Product is successfully added';
      }
      setTimeout(() => {
        this.addProductMessage = '';
      }, 3000);
    });
  }
}
