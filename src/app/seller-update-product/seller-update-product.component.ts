import { Component, inject } from '@angular/core';
import { Product } from '../interfases';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  routeNavigation = inject(Router);
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

  updateProductSubmit(data: Product) {
    if (this.productData) {
      data.id = this.productData.id
    }
    this.product.updateProduct(data).subscribe((response) => {
      if (response) {
        this.routeNavigation.navigate(['/seller-home']);
      }
    });
  }
}
