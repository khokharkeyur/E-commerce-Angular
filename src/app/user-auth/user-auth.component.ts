import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignUP } from '../interfases';

@Component({
  selector: 'app-user-auth',
  imports: [FormsModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {

  signUp(data:SignUP) {
    console.log('data', data)
  }

}
