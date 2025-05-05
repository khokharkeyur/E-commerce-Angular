import { Component, inject } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../interfases';

@Component({
  selector: 'app-my-orders',
  imports: [],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css',
})
export class MyOrdersComponent {
  product = inject(ProductService);
  orderData: order[] | undefined;

  ngOnInit() {
    this.product.orderList().subscribe((result) => {
      this.orderData = result;
    });
  }
}
