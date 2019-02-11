import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../../models/user'
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  user: User;
  
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone,
    private auth: AuthService
    ) { }

    getUsers() {
      // Por temas obvios...Seguridad.....
      // Firebase no te deja bajar la lista de usuarios en Auth.....
      // Segunda justificación apra tener una colleción de usuarios en mi bd
      return this.afs.collection('users').snapshotChanges();
    }
  
    createUser(user: User) {
      let data = Object.assign({}, user);
      delete data.clave;

      // si le quito el catch dejo que quien lo usa se encargue del error
      // será mala practica? podre usar throw??
      // aun me complica el concepto de promesa...
      return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.clave)
      .then((result) => {
        data.uid = result.user.uid;
        this.afs.collection('users').doc(result.user.uid).set({
          uid: result.user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: true, //user.emailVerified
          rol: user.rol,
          state: true
        });
      });
    }
  
    updateUser(user: User) {
      let data = Object.assign({}, user);
      delete data.clave;
      this.afs.doc('users/' + user.uid).update(data);
    }
  
    deleteUser(uid: string) {
      this.afs.doc('users/' + uid).delete();
    }
}
