import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../interfases';

@Component({
  selector: 'app-header',
  imports: [RouterLink, TitleCasePipe, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  searchResult: Product[] = [];
  cardItems: number = 0;
  constructor(private router: Router, private product: ProductService) {}
  ngOnInit(): void {
    this.router.events.subscribe((value: any) => {
      if (value?.url) {
        if (localStorage.getItem('seller') && value?.url.includes('seller')) {
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore);
          this.sellerName = sellerData?.name || '';
          this.menuType = 'seller';
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData?.name || '';
          this.menuType = 'user';
        } else {
          this.menuType = 'default';
        }
      }
    });

    if (localStorage.getItem('cart')) {
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      this.cardItems = cart.length;
    }
    this.product.cardData.subscribe((data) => {
      this.cardItems = data.length;
    });
  }
  logout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }
  userLogout() {
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
  }
  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      const queryText = element.value.trim();
      if (queryText.length > 0) {
        this.product.SearchProduct(queryText).subscribe((data) => {
          this.searchResult = data.filter((product) =>
            product.name.toLowerCase().includes(queryText.toLowerCase())
          );

          if (this.searchResult.length > 5) {
            this.searchResult.length = 5;
          }
        });
      } else {
        this.searchResult = [];
      }
    }
  }

  hideSearch() {
    this.searchResult = [];
  }
  submitSearch(query: string) {
    this.router.navigate([`/search/${query}`]);
  }
  redirectToDetails(productId: string) {
    console.log('productId', productId);
    this.router.navigate([`/details/${productId}`]);
  }
}
