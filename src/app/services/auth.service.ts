import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// entiendo que esto puede ser opcional, pero es mejor el strong type
import { User } from '../models/user';
import { Roles } from '../models/roles';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // obervamos el user
  // cuando hace logout detenemos el observer
  user$: Observable<User>;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router
    ) {
      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
            // Logged in
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            // Logged out
            return of(null);
          }
        })
      );
    }

    // esto es con async await....
    async googleSignin() {
      const provider = new auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      return this.updateUserData(credential.user);
    }
  
    // TODO: desestructurar
    private updateUserData(user) {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
  
      const data: User = {
        uid: user.uid,
        email: user.email,
        roles: {
          admin: true
        }
      }
  
      return userRef.set(data, { merge: true })
  
    }
  
    // esto es con async await....
    async signOut() {
      await this.afAuth.auth.signOut();
      this.router.navigate(['/']);
    }
}
