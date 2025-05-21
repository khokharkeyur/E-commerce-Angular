import { Cart, order, Product } from './../interfases';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cardData = new EventEmitter<Product[] | []>();
  constructor(private http: HttpClient) {}
  addProduct(data: Product) {
    return this.http.post('http://localhost:3000/products', data);
  }
  productList() {
    return this.http.get<Product[]>('http://localhost:3000/products');
  }
  deleteProduct(id: string) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
  getProduct(id: string) {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }
  updateProduct(product: Product) {
    return this.http.put<Product>(
      `http://localhost:3000/products/${product.id}`,
      product
    );
  }
  popularProduct() {
    return this.http.get<Product[]>(
      'http://localhost:3000/products?_sort=rating&_order=desc&_limit=3'
    );
  }
  Tranding() {
    return this.http.get<Product[]>(
      'http://localhost:3000/products?_sort=rating&_order=desc&_limit=8'
    );
  }
  SearchProduct(query: string) {
    return this.http.get<Product[]>(
      `http://localhost:3000/products?q=${query}`
    );
  }
  localAddToCart(product: Product) {
    let cart: Product[] = [];

    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart') || '[]');
    }

    let existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct?.quantity && product?.quantity) {
      existingProduct.quantity += product.quantity;
    } else {
      cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cardData.emit(cart);
  }

  removeToCartInLocal(productId: string) {
    let cart: Product[] = [];
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart') || '[]');
    }
    let newCart = cart.filter((item) => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(newCart));
    this.cardData.emit(newCart);
  }
  addTocard(cartData: Cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }
  getCartList(userId: string) {
    return this.http
      .get<Product[]>(`http://localhost:3000/cart?userId=${userId}`, {
        observe: 'response',
      })
      .subscribe((response) => {
        console.log('response', response);
        this.cardData.emit(response.body || []);
      });
  }

  removeToCart(id: string) {
    return this.http.delete(`http://localhost:3000/cart/${id}`);
  }
  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Product[]>(
      `http://localhost:3000/cart?userId=${userData.id}`
    );
  }
  orderNow(data: order) {
    return this.http.post('http://localhost:3000/order', data);
  }
  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>(
      `http://localhost:3000/order?userId=${userData.id}`
    );
  }

  deleteCartItem(id: string) {
    return this.http
      .delete(`http://localhost:3000/cart/${id}`,{observe: 'response'})
      .subscribe((result) => {
        if (result) {
          this.cardData.emit([]);
        }
      });
  }
  cancelOrder(orderId: string){
    return this.http.delete(`http://localhost:3000/order/${orderId}`,{observe: 'response'})
  }
}
