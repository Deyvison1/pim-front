import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user.dto';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = 'http://localhost:8080/api/usuarios'
  jwtHelper = new JwtHelperService;
  decodificadorToken: any;

  constructor(private http: HttpClient) { }

  logado() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
  add(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}`, user);
  }

  login(user: User) {
    return this.http.post<User>(`${this.url}/auth`, user).pipe(
      map((resp) => {
        const user = resp;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodificadorToken = this.jwtHelper.decodeToken(user.token);
        }
      })
    )
  }
}
