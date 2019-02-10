import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from '../components/accounts/login/sign-in/sign-in.component';
import { SignUpComponent } from '../components/accounts/login/sign-up/sign-up.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../components/accounts/login/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from '../components/accounts/login/verify-email/verify-email.component';
import { UsersComponent } from '../components/accounts/login/users/users.component';
import { RestaurantsComponent } from '../components/restaurants/restaurants.component';
import { AuthGuard } from "../guard/auth.guard";
import { SecureInnerPagesGuard } from "../guard/secure-inner-pages.guard";

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'register-user', component: SignUpComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'home', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'restaurants', component: RestaurantsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }