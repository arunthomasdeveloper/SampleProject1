import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../users.service';

@Component({
  selector: 'ngx-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent implements OnInit {
  error = false;
  resetPassForm: FormGroup;
  user: any;
  showSuccessMsg: boolean;
  errorMessage: any;
  error_messages = {
    
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

  constructor(private userservice: UserService, private router: Router, public formBuilder: FormBuilder) {
    this.resetPassForm = this.formBuilder.group({
        password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
      confirmpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]))
    });
  }
  onFormSubmit() {

    if (this.resetPassForm.valid) {
      this.user.credentials = [{ type: "password", value: this.resetPassForm.get('confirmpassword').value }];


      this.userservice.post(this.user)
        .subscribe(obj => {
          // alert(obj);
          this.showSuccessMsg = true;
          this.resetPassForm.setValue  ({
            password: '',
            cnfpassword: '',
          });

        },
          error => {
            this.errorMessage = error;
            this.error = true;
          }
        );
    }
  }

  ngOnInit(): void {
  }

}
