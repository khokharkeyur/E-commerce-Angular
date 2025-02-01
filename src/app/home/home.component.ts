import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { Component, inject } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../interfases';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NgbCarouselModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  Product = inject(ProductService);
  popularProductList: Product[] | undefined;
  trandingProduct: Product[] | undefined;
  ngOnInit(): void {
    this.Product.popularProduct().subscribe((response) => {
      if (response) {
        this.popularProductList = response;
  }
})
    this.Product.Tranding().subscribe((response) => {
      if (response) {
        this.trandingProduct = response;
      }
    });

}
}
