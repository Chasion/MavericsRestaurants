import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../models/user';
import { AccountsService } from 'src/app/services/accounts/accounts.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  usersList: User[];
  constructor(
    private restaurantService: RestaurantService,
    private toastr: ToastrService,
    private accountService: AccountsService
    ) { }

  ngOnInit() {
    this.resetForm();
    this.accountService.getUsers().subscribe(data => {
      this.usersList = data.map(e => {
        return {
          // Interezante los ...
          uid: e.payload.doc.id,
          ...e.payload.doc.data()
        } as User;
      });
    });
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
