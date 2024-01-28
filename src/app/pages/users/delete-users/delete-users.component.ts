import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../users.service';
import { User } from '../../../model/user';
import { credentialsInfo } from '../../../model/user';

@Component({
  selector: 'ngx-delete-users',
  templateUrl: './delete-users.component.html',
  styleUrls: ['./delete-users.component.scss']
})
export class DeleteUsersComponent implements OnInit {

  title = 'Delete Users';
  Result = "";
  UpdateUserForm = true;
  UpdateFormsubform = true;
  submitOne = true;
  userInfoForm: FormGroup;
  user = new User();
  selectedId="";
  errorMessage;
  users: { typeof(User) }[]
  constructor(private userservice: UserService, private router: Router, private elementRef: ElementRef) { }
  ngOnInit() {
    this.userInfoForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      userName: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      cnfpassword: new FormControl(),
      selectedUser: new FormControl()
    });

    this.getUsers();
  }

  getUsers() {
    this.users = [];
    let usersinfo: { typeof(User) }[]
    this.userservice.get()  
      .subscribe(
        data => {
          usersinfo = JSON.parse(JSON.stringify(data));
          usersinfo.forEach((repo) => {
            Object.entries(repo).forEach(([key, value]) => {
              if (`${key}` == 'enabled' && `${value}` == 'true') {
                this.users.push(repo);
              }
            });
          });
        },
        error => {

          // debugger;
          return false;
        });

    return false;
  }


  disableUser(): void {

    console.log(this.userInfoForm.value);
    this.user.firstName = this.userInfoForm.get('firstName').value;
    this.user.lastName = this.userInfoForm.get('lastName').value;
    this.user.username = this.userInfoForm.get('userName').value;
    this.user.email = this.userInfoForm.get('email').value;
    this.user.enabled = false;
    this.user.credentials = [{ type: "password", value: this.userInfoForm.get('cnfpassword').value }];
    this.userservice.patch(this.user, this.selectedId)
      .subscribe(obj => {
        this.userInfoForm.setValue({
          firstName: '',
          lastName: '',
          userName: '',
          email: '',
          password: '',
          cnfpassword: '',
          selectedUser: ''
        });
        this.getUsers();
        this.submitOne = true;

      },
        error => this.errorMessage = error

      );
  }

  getUser() {

      this.selectedId=this.userInfoForm.get('selectedUser').value;
    this.userservice.getUser(this.selectedId)
      .subscribe(
        data => {
          this.user = JSON.parse(JSON.stringify(data));
          console.log(this.user)
          this.submitOne = false;
          this.userInfoForm.setValue({
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            userName: this.user.username,
            email: this.user.email,
            password: '',
            cnfpassword: '',
            selectedUser: ''
          });
        },
        error => {
          // debugger;
          error => this.errorMessage = error
        });
  }
}





