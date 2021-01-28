import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  model: any = {};
  currentUser$: Observable<User | null> = new Observable<User>();

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

  login(): void{
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
    }, error => {
      console.error(error);
    });
  }

  logout(): void{
    this.accountService.logout();
  }

}
