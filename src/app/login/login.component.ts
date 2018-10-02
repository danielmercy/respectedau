import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AuthService } from "../core/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide: boolean = true;
  
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private el: ElementRef) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required ]]
    })
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    let loader = this.el.nativeElement.querySelector('.backdrop');
    
    loader.classList.add('visible');
      this.auth.loginUser(this.loginForm.value).then(res => {
        this.router.navigateByUrl('/')
      }, (err) => {
        console.log(err)
        loader.classList.remove('visible'); 
      });
      
  }

}
