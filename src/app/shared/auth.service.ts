import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {delay, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false
  redirectUrl!: string;

  constructor() {
  }

  login(login: string, password: string): Observable<boolean> {
    const observable = of({login: 'admin', password: '123'}).pipe(delay(1000))

    return observable.pipe(
      map((res: any) => login === res.login && password === res.password ? this.isLoggedIn = true : false)
    )
  }

  logout():any {
    this.isLoggedIn = false;
  }

}
