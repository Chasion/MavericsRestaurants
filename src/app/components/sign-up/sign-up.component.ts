import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth/auth.service";


// TODO: Usar para crear usuarios o basarme en esto por lo menos, mm me sirve el servicio.....
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() { }

}