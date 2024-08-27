import { Injectable, inject } from '@angular/core';
import { Auth, OAuthProvider, signInWithPopup, signOut } from '@angular/fire/auth';
import { environment } from '../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private afAuth: Auth = inject(Auth);

  constructor() {}

  // Login with Microsoft provider
  async loginWithMicrosoft() {
    try {
      const provider = new OAuthProvider('microsoft.com');
      provider.setCustomParameters({
        tenant: environment.tenantId,
      });
      const result = await signInWithPopup(this.afAuth, provider);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error during Microsoft login:', error.message); // Access the error message
      } else {
        console.error('Unexpected error during Microsoft login:', error); // Handle unexpected error types
      }
      throw error;
    }
  }

  // Logout the current user
  async logout(): Promise<void> {
    try {
      await signOut(this.afAuth);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error during logout:', error.message); // Access the error message
      } else {
        console.error('Unexpected error during logout:', error); // Handle unexpected error types
      }
      throw error;
    }
  }
}
