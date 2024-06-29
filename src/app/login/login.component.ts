import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service'; 
import { User } from '../models/user.model'; 

import { Router } from '@angular/router';
 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
 
 
export class LoginComponent implements OnDestroy {
 
  loginForm!: FormGroup;
  authService: any;
  userService: any;
 
  constructor(private fb: FormBuilder, private router: Router) {
 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.strongPassword]]
    });
  }
 
  strongPassword(control: AbstractControl): ValidationErrors | null {
 
    const value = control.value;
 
    if (!value) {
      return null;
    }
 
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const hasMinLength = value.length >= 8;
 
    const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar && hasMinLength;
 
    if (!valid) {
      return { strong: true };
    }
    return null;
  }
 
  ngOnDestroy(): void {
    console.log("Login Component Destroyed")
  }
 
  login(){
    this.authService.login()
  }
 
  onSubmit() {
    if (this.loginForm.valid) {
      let newUser: User = {
        id: this.userService.getUsers().length + 1,
        // username: this.loginForm.value.username,
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
        name: ''
      };
      this.userService.addUser(newUser);
      console.log('User registered:', newUser);
      this.loginForm.reset()
    }
  }
 
}
 
