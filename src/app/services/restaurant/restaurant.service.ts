import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Restaurant } from 'src/app/models/restaurant';
import { database } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private firestore: AngularFirestore) { }

  getRestaurants() {
    return this.firestore.collection('restaurants').snapshotChanges();
  }

  createRestaurant(restaurant: Restaurant) {
    return this.firestore.collection('restaurants').add(restaurant);
  }

  updateRestaurant(restaurant: Restaurant) {
    this.firestore.doc('restaurants/' + restaurant.$key).update(restaurant);
  }

  deleteRestaurant($key: string) {
    this.firestore.doc('restaurants/' + $key).delete();
  }
}
