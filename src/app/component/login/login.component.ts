import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, firstValueFrom, from, mergeMap, of } from 'rxjs';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router, private firebaseService: FirebaseService) { }

  // Method to login using Microsoft and navigate to the home page on success
  async microsoftLogin() {
    try {
      const result = await this.firebaseService.loginWithMicrosoft();  // Await the loginWithMicrosoft call
  
      if (result) {
        this.router.navigate(['/home']);  // Navigate to '/home' if login is successful
      }
    } catch (error) {
      console.error('Error during Microsoft login:', error);  // Log error for debugging
    }
  }
  
}
