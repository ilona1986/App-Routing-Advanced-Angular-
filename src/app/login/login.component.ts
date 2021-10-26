import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLogin: string = 'admin';
  userPassword: string = '123';
  message!: string;

  constructor(
    public authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.setMessage();
  }

  login(): void {
    let redirect!: string;
    this.message = 'Trying to log in...';
    this.authService.login(this.userLogin, this.userPassword).subscribe(res => {
      console.log('Login observable result:', res)
      this.setMessage();
      redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';
      this.router.navigate([redirect]).then()
    });
  }

  logout(): void {
    this.authService.logout();
    this.setMessage();
  }
  setMessage():void {
    this.message = `Logged ${this.authService.isLoggedIn ? 'in' : 'out'}`
  }
}
