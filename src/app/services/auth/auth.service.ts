import { Injectable, NgZone } from '@angular/core';
import { User } from "../../models/user";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { state } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // guardamos info del user logeado

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone
  ) {    
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  signIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        this.setUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  signUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationMail();
        this.setUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      })
  }

  sendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email-address']);
    })
  }

  forgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Correo para recuperar clave enviado.');
    }).catch((error) => {
      window.alert(error);
    })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    // return (user !== null && user.emailVerified !== false) ? true : false;
    return (user !== null) ? true : false;
  }

  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  authLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
      this.ngZone.run(() => {
          this.router.navigate(['home']);
      })
      this.setUserData(result.user);
    }).catch((error) => {
      window.alert(error);
    })
  }

  // por ahora lo manejo acá pero esto deberia ser parte
  // del accountService y acá solo temas de autenticación
  // si no se crean cuentas desde afuera esto no sirve de nada
  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData = {
      email: user.email
    }

    return userRef.set(userData, {
      merge: true
    });
  }

  signOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }

}