import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Restaurant } from 'src/app/models/restaurant';

@Injectable({
  providedIn: 'root'
})

export class RestaurantService {
  restaurant: Restaurant;
  constructor(public afs: AngularFirestore) { }

  getRestaurants() {
    return this.afs.collection('restaurants').snapshotChanges();
  }

  createRestaurant(restaurant: Restaurant) {
    return this.afs.collection('restaurants').add(restaurant);
  }

  updateRestaurant(restaurant: Restaurant) {
    let data = Object.assign({}, restaurant);
    delete data.uid;
    this.afs.doc('restaurants/' + restaurant.uid).update(data);
  }

  deleteRestaurant(uid: string) {
    this.afs.doc('restaurants/' + uid).delete();
  }
}
