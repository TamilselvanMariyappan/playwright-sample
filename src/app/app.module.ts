import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { environment } from './environments/enviroment';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideAuth(() => getAuth(getApp())),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    AngularFireAuthModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
