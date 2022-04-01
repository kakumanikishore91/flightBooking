import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../../models';

const helper = new JwtHelperService();


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private SERVER_URL = "http://localhost:3000";
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    // TODO: rebuild user from validated token here to avoid localstorage tampering
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(this.SERVER_URL + `/login`, { email, password })
    .pipe(map(response => {
      let user = new User;

      // login successful if there's a jwt token in the response
      // and if that token is valid
      if (response && response.accessToken) {
        let decodedToken = response.accessToken;

        // Build up a user
        user.token  = JSON.stringify(response.accessToken);
        user.email  = decodedToken.email;
        user.id     = decodedToken.id;

        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }

      return user;
    }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}