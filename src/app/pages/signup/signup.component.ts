import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from '../../model/user';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../users/users.service';
@Component({
  selector: 'ngx-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupform: FormGroup;
  error_messages = {
    'firstName': [
      { type: 'required', message: 'First Name is required.' },
    ],

    'lastName': [
      { type: 'required', message: 'Last Name is required.' }
    ],
    'userName': [
      { type: 'required', message: 'User Name is required.' },
      { type: 'minlength', message: 'User Name length.' },
      { type: 'maxlength', message: 'User Name length.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'minlength', message: 'Email length.' },
      { type: 'maxlength', message: 'Email length.' },
      { type: 'email', message: 'please enter a valid email address.' }
    ],
    'password': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' }
    ]
    }
  userNameValid=false;
  users: User[];
  userExists: boolean=false  ;
  constructor( public formBuilder: FormBuilder,private authenticationService: AuthenticationService,private userservice: UserService,) { 


    this.signupform = this.formBuilder.group({
      firstName: new FormControl('', Validators.compose([Validators.required])),
      lastName: new FormControl('', Validators.compose([Validators.required])),
      userName: new FormControl('', Validators.compose([
        Validators.required,Validators.minLength(6), Validators.maxLength(30)])),
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(6),
          Validators.maxLength(30)
        ])),
        password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30)
        ]))
      });
  }
 
  ngOnInit(): void {
  }

  onKeydownUN($event) {
    let hasanyError =true;

    for (const error of this.error_messages.userName) {
      hasanyError=this.signupform.get('userName').hasError(error.type);
      if(hasanyError) break;
    }     

    console.log('hasanyError :'+hasanyError);
    this.userNameValid=!hasanyError;
     
  }
  checkUserNameAvailability() {
    if (this.userNameValid) {
      this.getUsers();
      let IsExists = true;
      var Uname = this.signupform.get('userName').value;
      let usersinfo: User[]
      usersinfo = this.users;
      usersinfo.forEach((repo) => {
        Object.entries(repo).forEach(([key, value]) => {
          if (`${value}` == Uname) {
            IsExists = false;
            console.log('Name is here');
            return;
          }
        });
      });
      this.userExists=!IsExists;
     
    }
  }
  getUsers() {
    this.users = [];
    let usersinfo: User[]

    this.userservice.get()
      .subscribe(
        data => {
          usersinfo = JSON.parse(JSON.stringify(data));
          
          usersinfo.forEach((repo) => {
            Object.entries(repo).forEach(([key, value]) => {
              if (`${key}` == 'username' && `${value}` == 'true') {
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

}
