import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../../../services/accounts/accounts.service'
import { User } from '../../../../models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  usersList: User[];

  constructor(
    private accountService: AccountsService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
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

  onUpdate(user: User) {
    this.accountService.user = Object.assign({}, user);
  }

  onDelte(uid: string) {
    if(confirm("Confirmar eliminación?")) {
      // this.accountService.deleteRestaurant(uid);
      // this.toastr.warning("Usuario eliminado", "Accounts");
    }
  }

}
