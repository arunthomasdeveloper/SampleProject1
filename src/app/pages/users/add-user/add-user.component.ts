import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../users.service';
import { User ,userContact} from '../../../model/user';
import { credentialsInfo } from '../../../model/user';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AuthenticationService } from '../../../services/authentication.service';
import { applyMixins } from 'rxjs/internal-compatibility';

@Component({
  selector: 'ngx-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  
  title = 'Add Users';
  Result = "";
  addUserForm = true;
  userNameValid = false;
  userExists = false;
  userInfoForm: FormGroup;
  user = new User();
  errorMessage = '';
  error = false;
  showSuccessMsg = false;
  btnchkuserclass = '';
  users: User[]
  userContact=new userContact();
  currentUser:any;
  uuid:any;
  error_messages = {
    'firstName': [
      { type: 'required', message: 'First Name is required.' },
    ],

    'lastName': [
      { type: 'required', message: 'Last Name is required.' }
    ],
    'addressLine1': [
      { type: 'required', message: 'AddressLine1 is required.' }
    ],
    'addressLine2': [
      { type: 'required', message: 'AddressLine1 is required.' }
    ],
    'addressLine3': [
      { type: 'required', message: 'AddressLine3is required.' }
    ],
    'country': [
      { type: 'required', message: 'Countryis required.' }
    ],
    'countryCode': [
      { type: 'required', message: 'Country Code is required.' }
    ],
    'mobileNo': [
      { type: 'required', message: 'Mobile No is required.' }
    ],
    'postCode': [
      { type: 'required', message: 'Post Code is required.' }
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
    ],
    'confirmpassword': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' }
    ],
  }

  constructor(private userservice: UserService, private router: Router, public formBuilder: FormBuilder,private authenticationService: AuthenticationService) {
    this.currentUser=this.authenticationService.currentUserValue;
    this.userInfoForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.compose([
        Validators.required
      ])),
      lastName: new FormControl('', Validators.compose([
        Validators.required
      ])),
      addressLine1: new FormControl('', Validators.compose([
        Validators.required
      ])),
      addressLine2: new FormControl('', Validators.compose([
        Validators.required
      ])),
      addressLine3: new FormControl('', Validators.compose([
        Validators.required
      ])),
      country: new FormControl('', Validators.compose([
        Validators.required
      ])),
      countryCode: new FormControl('', Validators.compose([
        Validators.required
      ])),
      mobileNo: new FormControl('', Validators.compose([
        Validators.required
      ])),
      postCode: new FormControl('', Validators.compose([
        Validators.required
      ])),
      userName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
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
      ])),
      confirmpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
    }, {
      validators: this.password.bind(this)
    });

  }



  ngOnInit() {
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    console.log(password + " : " + confirmPassword);
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  checkUserNameAvailability() {
    if (this.userNameValid) {
      this.getUsers();
      let IsExists = true;
      var Uname = this.userInfoForm.get('userName').value;
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

  onKeydownUN($event) {
    let hasanyError =true;

    for (const error of this.error_messages.userName) {
      hasanyError=this.userInfoForm.get('userName').hasError(error.type);
      if(hasanyError) break;
    }     

    console.log('hasanyError :'+hasanyError);
    this.userNameValid=!hasanyError;
     
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
  getValue(elementName:string){
    return this.userInfoForm.get("'"+elementName +"'").value;
  }
  onFormSubmit() {
    if (this.userInfoForm.valid) {

      this.user.firstName = this.userInfoForm.get('firstName').value;
      this.user.lastName = this.userInfoForm.get('lastName').value;
      this.user.username = this.userInfoForm.get('userName').value;
      this.user.email = this.userInfoForm.get('email').value;
      this.user.enabled = true;
      this.user.credentials = [{ type: "password", value: this.userInfoForm.get('confirmpassword').value }];
      this.userContact.uuid
      this.userContact.userContactInfo={
            addressLine1:this.getValue("addressLine1"),
            addressLine2:this.getValue("addressLine2"),
            addressLine3:this.getValue("addressLine3"),
            country:this.getValue("country"),
            countryCode:this.getValue("countryCode"),
            mobileNo:this.getValue("mobileNo"),
            postCode:this.getValue("postCode"),    
        }

      this.userservice.post(this.user)
        .subscribe(obj => {         

          this.userservice.postAddress(this.userContact).subscribe(
            obj=>{
              this.showSuccessMsg = true;
              this.userInfoForm.reset();
            },error=>{
              this.errorMessage = error; this.error = true;
            }
          );        

        },
          error => {           
            this.errorMessage = error; this.error = true;
          }
        );
         
        
    }
    else {

    }
  }

}


