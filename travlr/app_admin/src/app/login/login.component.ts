import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public formError: string = '';
  submitted = false;

  credentials = {
    name: '',
    email: '',
    password: ''
  }

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public onLoginSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password || !this.credentials.name) {
      this.formError = 'Please fill in all fields.';
      this.router.navigateByUrl('#'); // back to login page
    }
    else {
      this.doLogin();
    }
  }

  private doLogin(): void {
    let newUser = {
      name: this.credentials.name,
      email: this.credentials.email
    } as User;

    // console.log('Inside LoginComponent::doLogin, credentials:');
    // console.log(this.credentials);

    this.authService.login(newUser, this.credentials.password);

    if(this.authService.isLoggedIn()) {
      this.router.navigate(['']);
    }
    else {
      var timer = setTimeout(() => {
        if(this.authService.isLoggedIn()) {
          this.router.navigate(['']);
        }}, 3000);
      }
    }

}
