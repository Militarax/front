import { Component, OnInit } from '@angular/core';
import {AuthenticationService, UserService} from '@app/_services';
import {User} from '@app/_models';
import {Router} from '@angular/router';
import {AppComponent} from '@app/app.component';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: User;

  constructor(private authserv: AuthenticationService, private router: Router,
              private userService: UserService, private appcomp: AppComponent) {
    this.authserv.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
  }

  Logout() {
    this.appcomp.logout();
  }
}
