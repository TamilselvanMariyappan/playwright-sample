import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private firebaseService: FirebaseService, private router: Router) { }

  // Method to log out the user
  async logout(): Promise<void> {
    try {
      await this.firebaseService.logout();
      // Navigate back to the login page after logging out
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
}
