import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { userInfo } from 'os';
import { HomeService } from '../../services/homepage.service';
import { UserInfo } from './Interfaces';

@Component({
  selector: 'ngx-home-page',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],

})
export class HomePageComponent {

  title = 'Home Page';
  Result = "";
  userForm: FormGroup;
  user = { name: "", address: "", age: "", city: "" };
  errorMessage;
  constructor(private homeservice: HomeService, private router: Router) { }
  ngOnInit() {

    this.userForm = new FormGroup({
      name: new FormControl(),
      age: new FormControl(),
      address: new FormControl(),
      city: new FormControl()
    });
  }
  onFormSubmit(): void {
    console.log(this.userForm.value);
    this.user.name = this.userForm.get('name').value;
    this.user.address = this.userForm.get('address').value;
    this.user.age = this.userForm.get('age').value;
    this.user.city = this.userForm.get('city').value;

    this.homeservice.adduser(this.user)
      .subscribe(obj => {

        alert(obj);

      },
        error => this.errorMessage = error);
  }

}

