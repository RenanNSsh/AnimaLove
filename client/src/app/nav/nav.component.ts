import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  user: any = {};
  currentUser$: Observable<User | null> = new Observable<User>();

  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login(): void{
    this.accountService.login(this.user).subscribe(response => {
      this.router.navigateByUrl('/members');
    }, error => {
      console.error(error);
      this.toastr.error(error.error);
    });
  }

  logout(): void{
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
