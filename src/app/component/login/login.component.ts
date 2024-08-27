import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router, private firebaseService: FirebaseService) { }

  // Method to login using Microsoft and navigate to the home page on success
  async microsoftLogin(): Promise<void> {
    try {
      const result = await this.firebaseService.loginWithMicrosoft();
  
      if (result && result.user) {
        console.log('Login successful:', result.user);
        this.router.navigate(['/home']);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error during Microsoft login:', error.message); // Access the error message
      } else {
        console.error('Unexpected error during Microsoft login:', error); // Handle unexpected error types
      }
    }
  }
  
}
