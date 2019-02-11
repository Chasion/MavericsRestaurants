import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from '../../../../services/accounts/accounts.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private accountService: AccountsService,
    private toastr: ToastrService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.resetForm();
  }
  
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();

    this.accountService.user = {
      uid: null,
      displayName: '',
      email: '',
      rol: 1,
      emailVerified: true,
      photoURL: '',
      state: false
    }
  }

  onSubmit(form: NgForm) {
    let data = form.value;
    // Chanchada
    // let currentUser = Object.assign({}, this.auth.userData);
    data.state = true;

    if (data.uid == null) {
      this.accountService.createUser(data)
      .then(() => {
        // Hacer esto era una chanchada horrenda        
        //this.auth.signIn(currentUser.)
        // La forma correcta era hacer un ws en node.js con firebase-admin
        // que me de un endpoint para crear usuarios y
        // consumirlo desde acá
        
        this.resetForm(form);
        this.toastr.success('Usuario registrado', 'Accounts');
      })
      .catch((error) => {
        this.toastr.error(error.message, 'Accounts');
      });
    }
    else {
      this.accountService.updateUser(data);
      this.resetForm(form);
      this.toastr.success('Usuario modificado', 'Accounts');
    }
  }

}
