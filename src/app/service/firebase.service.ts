import { Injectable, inject } from '@angular/core';
import { Auth, OAuthProvider, signInWithPopup, signOut } from '@angular/fire/auth';

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
      const result = await signInWithPopup(this.afAuth, provider);
      return result;
    } catch (error) {
      throw error;
    }
  }
  
  // Logout the current user
  async logout(): Promise<void> {
    try {
      await signOut(this.afAuth);
    } catch (error) {
      throw error;
    }
  }
}
