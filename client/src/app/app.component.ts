import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { User } from './models/user';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AnimaLove';
  users: any;

  constructor(private http: HttpClient, private accountService: AccountService){}

  ngOnInit(): void{
     this.getUsers();
     this.setCurrentUser();
  }

  setCurrentUser(): void{
    const user: User = JSON.parse(localStorage.getItem('user') || '');
    this.accountService.setCurrentUser(user);
  }

  getUsers(): void{
    this.http.get('https://localhost:5001/api/users').subscribe(users => {
      this.users = users;
    }, error => {
      console.error(error);
    });
  }
}
