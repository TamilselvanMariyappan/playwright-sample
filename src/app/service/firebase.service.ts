import { inject, Injectable } from '@angular/core';
import { Auth, authState, OAuthProvider, signInWithPopup, signOut, user } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private afAuth: Auth = inject(Auth);

  constructor() { }

  // Login with Microsoft provider6 
  async loginWithMicrosoft() {
    try {
      const provider = new OAuthProvider('microsoft.com');
      provider.setCustomParameters({
        tenant: '62b81786-7c68-42ea-8a28-f0f614207729',
      });
  
      const result = await signInWithPopup(this.afAuth, provider);
      return result;  // Return the result as a Promise
    } catch (error) {
      console.log('Error during Microsoft login:', error);  // Log error for debugging
      throw error;  // Re-throw the error to be handled by the calling method
    }
  } 

  // Logout the current user
  async logout(): Promise<void> {
    try {
      await signOut(this.afAuth);
    } catch (error) {
      console.error('Error during logout:', error);  // Log error for debugging
      throw error;
    }
  }
}