import { Component } from '@angular/core';
import { Product } from '../interfases';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  imports: [RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchResult: undefined | Product[];
  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService
  ) {}

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    query &&
      this.product.SearchProduct(query).subscribe((result) => {
        this.searchResult = result.filter(product =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );
      });
  }
}
