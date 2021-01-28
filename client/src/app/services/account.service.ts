import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private currentUserSource = new ReplaySubject<User | null>(1);
  baseUrl = 'https://localhost:5001/api/';
  currentUser$ = this.currentUserSource.asObservable();


  constructor(private http: HttpClient) { }

  login(model: any): Observable<User>{
      return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
        map((response: User) => {
          const user = response;
          if (user){
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSource.next(user);
          }
          return user;
        })
      );
  }

  register(model: any): Observable<User>{
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map((response: User) => {
        const user = response;
        if (user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
    );
}

  setCurrentUser(user: User | null): void{
    this.currentUserSource.next(user);
  }

  logout(): void{
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

}
