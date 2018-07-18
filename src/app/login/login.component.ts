import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  googleLogin(): void {
    const socioPrueba = this.authService.doLoginGoogle();
    // console.log('Eres: ', socioPrueba.nombre);
  }

  logout(): void {
    this.authService.logout();
  }

}
