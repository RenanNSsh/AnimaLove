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

  constructor(private accountService: AccountService){}

  ngOnInit(): void{
     this.setCurrentUser();
  }

  setCurrentUser(): void{
    const userLocalStorage = localStorage.getItem('user') || '';
    let user: User | null = null;
    if (!!userLocalStorage){
      user = JSON.parse(userLocalStorage);
    }
    this.accountService.setCurrentUser(user);
  }
}
