import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login, SignUP } from '../interfases';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  imports: [FormsModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',
})
export class UserAuthComponent {
  user = inject(UserService);
  authError: string = '';
  showLogin: boolean = false;

  ngOnInit() {
    this.user.userAuthReaload();
  }

  signUp(data: SignUP) {
    this.user.userSignUp(data);
  }

  login(data: Login): void {
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((response) => {
      if (response) {
        this.authError = 'Invalid email or password';
      }
    });
  }

  openLogin(): void {
    this.showLogin = !this.showLogin;
  }
}
