import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { Component, inject } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../interfases';

@Component({
  selector: 'app-home',
  imports: [NgbCarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  Product = inject(ProductService);
  popularProductList: Product[] | undefined;
  ngOnInit(): void {
    this.Product.popularProduct().subscribe((response) => {
      if (response) {
        this.popularProductList = response;
  }
})}
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
}
