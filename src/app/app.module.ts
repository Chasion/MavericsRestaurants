import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './routing/app-routing.module';
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// Componentes
import { AppComponent } from './app.component';
import { SignInComponent } from './components/accounts/login/sign-in/sign-in.component';
import { SignUpComponent } from './components/accounts/login/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/accounts/login/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/accounts/login/verify-email/verify-email.component';
import { UsersComponent } from './components/accounts/users/users.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { RestaurantsListComponent } from './components/restaurants/restaurants-list/restaurants-list.component';
import { RestaurantComponent } from './components/restaurants/restaurant/restaurant.component';

// Servicios
import { AuthService } from "./services/auth/auth.service";
import { RestaurantService } from '../app/services/restaurant/restaurant.service';

// Config
import { environment } from '../environments/environment';
import { UserComponent } from './components/accounts/users/user/user.component';
import { UsersListComponent } from './components/accounts/users/users-list/users-list.component';

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
    RestaurantComponent,
    UserComponent,
    UsersListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthService,
    RestaurantService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }