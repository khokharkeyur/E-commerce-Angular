import { Component } from '@angular/core';
import { Product } from '../interfases';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seller-update-product',
  imports: [FormsModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent {

  updateProductSubmit(data: Product) {

  }
}
