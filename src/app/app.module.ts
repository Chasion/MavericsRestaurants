import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './routing/app-routing.module';
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';

// Componentes
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { UsersComponent } from './components/users/users.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { RestaurantsListComponent } from './components/restaurants/restaurants-list/restaurants-list.component';
import { RestaurantComponent } from './components/restaurants/restaurant/restaurant.component';

// Servicios
import { AuthService } from "./services/auth/auth.service";
import { RestaurantService } from '../app/services/restaurant/restaurant.service';

// Config
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    UsersComponent,
    RestaurantsComponent,
    RestaurantsListComponent,
    RestaurantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule
  ],
  providers: [
    AuthService,
    RestaurantService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }