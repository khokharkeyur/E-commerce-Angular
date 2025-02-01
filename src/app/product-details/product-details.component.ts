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

  activeRoute = inject(ActivatedRoute);
  product = inject(ProductService);

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    productId &&
      this.product.getProduct(productId).subscribe((result) => {
        console.log('result', result);
        this.productData = result;
      });
  }
  handleQuantity(value: string): void {
    if (this.productQuantity < 20 && value === 'plus') {
      this.productQuantity++;
      
    } else if (this.productQuantity > 1 && value === 'min') {
      this.productQuantity--;
    }
  }
}
