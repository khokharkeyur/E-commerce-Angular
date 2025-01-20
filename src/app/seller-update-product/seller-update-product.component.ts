import { Component, inject } from '@angular/core';
import { Product } from '../interfases';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  imports: [FormsModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css',
})
export class SellerUpdateProductComponent {
  route = inject(ActivatedRoute);
  product = inject(ProductService);
  productData: Product | undefined;
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.product.getProduct(productId).subscribe((data) => {
        console.log('data', data);
        this.productData = data;
      });
    }
  }

  updateProductSubmit(data: Product) {}
}
