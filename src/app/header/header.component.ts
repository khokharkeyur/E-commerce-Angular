import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  menuType: String = 'default';
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.router.events.subscribe((value: any) => {
      if (value?.url) {
        if (localStorage.getItem('seller') && value?.url.includes('seller')) {
          this.menuType = 'seller';
        } else {
          this.menuType = 'default';
        }
      }
    });
  }
}
