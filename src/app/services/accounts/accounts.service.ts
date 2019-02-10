import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../models/user'
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  user: User;
  
  constructor(
    public afs: AngularFirestore,
    private authService: AuthService
    ) { }

    getUsers() {
      return this.afs.collection('users').snapshotChanges();
    }
  
    createUser(user: User) {
      //return this.authService.signUp(user.email, user.)
    }
  
    updateUser(user: User) {
      let data = Object.assign({}, user);
      delete data.uid;
      this.afs.doc('users/' + user.uid).update(data);
    }
  
    deleteUser(uid: string) {
      this.afs.doc('users/' + uid).delete();
    }
}
