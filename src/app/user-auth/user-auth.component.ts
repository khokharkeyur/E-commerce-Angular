import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignUP } from '../interfases';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  imports: [FormsModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {

  user = inject(UserService)

  ngOnInit() {
    this.user.userAuthReaload()
  }

  signUp(data:SignUP) {
    this.user.userSignUp(data)
  }

}
