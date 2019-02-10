import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../../services/restaurant/restaurant.service';
import { Restaurant } from '../../../models/restaurant';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.css']
})
export class RestaurantsListComponent implements OnInit {
  restaurantsList: Restaurant[];

  constructor(
    private restaurantService: RestaurantService,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.restaurantService.getRestaurants().subscribe(data => {
      this.restaurantsList = data.map(e => {
        return {
          // Interezante los ...
          uid: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Restaurant;
      });
    });
  }
  
  onUpdate(restaurant: Restaurant) {
    this.restaurantService.restaurant = Object.assign({}, restaurant);
  }

  onDelte(uid: string) {
    if(confirm("Confirmar eliminación?")) {
      this.restaurantService.deleteRestaurant(uid);
      this.toastr.warning("Restaurant eliminado", "Restaurants");
    }
  }

}
