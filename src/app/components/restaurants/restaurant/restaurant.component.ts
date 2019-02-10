import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  constructor(
    private restaurantService: RestaurantService,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();

    this.restaurantService.restaurant = {
      uid: null,
      name: '',
      photo: '',
      users: null
    }
  }

  onSubmit(form: NgForm) {
    let data = form.value;
    let msg = 'Restaurant registrado';

    if (data.uid == null)
      this.restaurantService.createRestaurant(data);
    else {
      this.restaurantService.updateRestaurant(data);
      msg = 'Restaurant modificado';
    }
    
    this.resetForm(form);
    this.toastr.success(msg, 'Restaurants');
  }
}
