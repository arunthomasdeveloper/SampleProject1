
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication.service';
import { environment } from '../../../environments/environment';

@Component({
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  error_messages = {  
    'username': [
      { type: 'required', message: 'User Name is required.' },
      { type: 'minlength', message: 'User Name length.' },
      { type: 'maxlength', message: 'User Name length.' },
      { type: 'email', message: 'please enter a valid email address.' }
    ],
    'password': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' }
    ]
    }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate([environment.dashboard]);
    }
    this.loginForm = this.formBuilder.group({
    
        username: new FormControl('', Validators.compose([
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

  ngOnInit() {
    
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || environment.dashboard;
  }

     // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {

    this.router.navigate([environment.dashboard]);
    // this.submitted = true;
    // // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   return;
    // }
    
    // this.authenticationService.login(this.f.username.value, this.f.password.value)
    //   .subscribe(
    //     data => {

    //       this.router.navigate([this.returnUrl]);
    //     },
    //     error => {
    //       this.error = error;
    //       this.loading = false;
    //      // debugger;
    //       return;
    //      });       
  }
}


