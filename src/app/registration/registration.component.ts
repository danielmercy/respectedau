import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder, AbstractControl } from "@angular/forms";
import { SelectModel } from "./register.interface";
import { PhoneNumberValidator, ConfirmPasswordValidator } from "./validators";
import {PasswordValidators, UniversalValidators} from 'ngx-validators'
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { CountryApiService } from "../shared/country-api.service";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  isChecked: boolean = false;

  jobTitle: SelectModel[] = [
    { value: 'chef', viewValue: 'Chef'},
    { value: 'gardner', viewValue: 'Gardner'},
    { value: 'driver', viewValue: 'Driver'},
    { value: 'nanny', viewValue: 'Nanny'},
    { value: 'security', viewValue: 'Security'},
    { value: 'househelp', viewValue: 'House Help'}
  ];

  gender: SelectModel[] = [
    { value: 'male', viewValue: 'Male'},
    { value: 'female', viewValue: 'Female'}
  ];

  maritalStats: SelectModel[] = [
    { value: 'single', viewValue: 'Single'},
    { value: 'married', viewValue: 'Married'},
    { value: 'divorced', viewValue: 'Divorced'},
    { value: 'widowed', viewValue: 'Widowed'}
  ];

  validPassport: SelectModel[] = [
    { value: 'yes', viewValue: 'Yes'},
    { value: 'no', viewValue: 'No'}
  ];

  selectedJob: string = '';
  selectedGender: string = '';
  selectedMaritalStats: string = '';
  selectedCountry: string;
  selectedVp: string = '';
  countries: Array<object> = [];

  hide: boolean = true;
  
  minDOB = new Date(1943, 0, 1);
  maxDOB = new Date(2004, 0, 1);

  constructor(private el: ElementRef, private fb: FormBuilder, private auth: AuthService, private router: Router, private capi: CountryApiService) {  }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      jobtitle: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      validpassport: ['', [Validators.required]],
      maritalstatus: ['', [Validators.required]],
      gnder: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      //PhoneNumberValidator('NGN')
      password: ['', [
        Validators.required,
        PasswordValidators.digitCharacterRule(1),
        PasswordValidators.uppercaseCharacterRule(1),
        UniversalValidators.minLength(6),
        UniversalValidators.maxLength(12)
      ]],
      confirmPassword: ['', [
        Validators.required,
        PasswordValidators.digitCharacterRule(1),
        PasswordValidators.uppercaseCharacterRule(1),
        UniversalValidators.minLength(6),
        UniversalValidators.maxLength(12),
        ConfirmPasswordValidator
      ]],
      agreed: ['', [Validators.required]],
    });
    this.getCountry();
    // this.getCountryCode()
  }

  get fm() {
    return this.registrationForm.controls;
  }

  get firstname() {
    return this.fm.firstname;
  }

  get lastname() {
    return this.fm.lastname;
  }

  get email() {
    return this.fm.email;
  }

  get jobtitle() {
    return this.fm.jobtitle;
  }

  get dateOfBirth() {
    return this.fm.dateOfBirth;
  }

  get country(): AbstractControl {
    return this.fm.country;
  }

  get state() {
    return this.fm.state;
  }

  get validpassport() {
    return this.fm.validpassport;
  }

  get maritalstatus() {
    return this.fm.maritalstatus;
  }

  get gnder() {
    return this.fm.gnder;
  }

  get address() {
    return this.fm.address;
  }

  get phone() {
    return this.fm.phone;
  }

  get password() {
    return this.fm.password;
  }

  get confirmPassword() {
    return this.fm.confirmPassword;
  }

  get agreed() {
    return this.fm.agreed;
  }

  public getCountry(){
    this.capi.countries.subscribe((data:  Array<object>) => {
        return this.countries  = data;
    });
  }

  public getCountryCode() {
    let selected = this.countries.find((item: any): any=> {
      if(item) {
        return item.name == this.selectedCountry
      } 
    })

    console.log(selected);
    
  }

  // getFNErrorMessage() {
  //   // return this.fm.firstname.errors.required ? 'Your firstname is required' : this.fm.firstname.errors.minLength ? 'Must be at least 3' : '';
  //}

  onSubmit() {
    let loader = this.el.nativeElement.querySelector('.backdrop');
    loader.classList.add('visible');

    this.auth.createAccount(this.registrationForm.value).then(res => {
      let user = res.user;
      if(res.additionalUserInfo.isNewUser && user.emailVerified == false) {
        this.router.navigateByUrl(`/auth/${res.user.uid}/verify`)
      } else {
        this.router.navigateByUrl(`/dashboard`)
      }
      
      this.auth.setClientData(this.registrationForm.value);
      console.log("Account created successfully", res);
    }).catch(err => {
      loader.classList.remove('visible');
      console.log("(RAA Notification) Error occured while trying to create a user account: ", err);
    });

    // console.log(this.registrationForm.value);
  }

}
