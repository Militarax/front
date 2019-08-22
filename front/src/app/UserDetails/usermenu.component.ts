import {Component, OnInit} from '@angular/core';
import {AuthenticationService, UserService} from '@app/_services';
import {User} from '@app/_models';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';


@Component({
  selector: 'app-usermenu',
  templateUrl: './usermenu.component.html',
  styleUrls: ['./usermenu.component.css']
})
export class UsermenuComponent implements OnInit {
  users: User[];
  user: User;
  if_clicked: boolean;
  if_edit_username: boolean;
  if_edit_password: boolean;
  clicked_login: boolean;
  clicked_pass: boolean;

  constructor(private userService: UserService, private auth: AuthenticationService, private toastrService: ToastrService, private  router: Router) {
        this.auth.currentUser.subscribe(user => {
            this.user = user;
        });
        this.if_clicked = false;
        this.clicked_login = false;
        this.clicked_pass = false;
        this.if_edit_password = false;
        this.if_edit_username = false;
  }

  ngOnInit() {
    this.getAllUsers();
    this.toastrService.info('Click on your username/password to change it');
  }
  ifClickedLogin() {
    this.clicked_login = true;
  }
  ifClickedPass() {
    this.clicked_pass = true;
  }
  ifEditUsername() {
    this.if_edit_username = true;
    this.if_edit_password = false;
    this.clicked_login = false;
    this.clicked_pass = false;
  }
  ifEditPass() {
    this.if_edit_password = true;
    this.if_edit_username = false;
    this.clicked_pass = false;
    this.clicked_login = false;
  }
  ifClicked() {
    this.if_clicked = true;
    if (confirm('Are you sure?')) {
      this.userService.delete(this.user.id).then(pr => {
        this.auth.logout();
        this.router.navigate(['login']);
      });
    }
  }
  getAllUsers() {
    this.userService.getAll().then(users => {
      this.users = users;
      let x: User;
      for (x of this.users) {
        if (x.username === this.user.username) {
          this.user.id = x.id;
        }
      }
    });
  }
  Error() {
     this.toastrService.warning('Length >= 6');
  }
  saveEditable(value) {
    if (this.clicked_login) {
      this.user.username = value;
      this.userService.update(this.user).then();
      this.clicked_login = false;
    }
    if (this.clicked_pass) {
      this.user.password = value;
      this.userService.update(this.user).then();
      this.clicked_pass = false;
    }
  }
}
