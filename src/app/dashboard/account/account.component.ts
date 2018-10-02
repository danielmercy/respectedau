import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { PasswordValidators, UniversalValidators } from "ngx-validators";
import { ConfirmPasswordValidator, PhoneNumberValidator } from "../../registration/validators";
import { SelectModel } from "../../registration/register.interface";
import { AuthService } from '../../core/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { CountryApiService } from '../../shared/country-api.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  accountUpdate: FormGroup;
  client: any;
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  work: string = '';
  dob: string = '';
  country: string = '';
  state: string = '';
  validPass: string = '';
  mariStatus: string = '';
  gnder: string = '';
  address: string = '';
  phone: string = '';
  photo: string = '';

  photoFormGroup: FormGroup;
  file: File;
  fileName;
  fileSize;
  workPairs: SelectModel[] = [
    { value: 'driver', viewValue: 'Driver'},
    { value: 'househelp', viewValue: 'House Help'},
    { value: 'nanny', viewValue: 'Nanny'}
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

  editable = new FormControl(true);
  
  minDOB = new Date(1943, 0, 1);
  maxDOB = new Date(2004, 0, 1);

  constructor(private fb: FormBuilder, private auth: AuthService, private afAuth: AngularFireAuth, private el: ElementRef, private capi: CountryApiService ) { 
    // this.fb.control({
    //   photo: ''
    // })
  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.afAuth.authState.subscribe(client => {
      if(client) {
        this.auth.clientsData(client.uid).subscribe((res: any) => {
          this.client = res;
          this.firstname = res.firstname;
          this.lastname = res.lastname;
          this.email = res.email;
          this.work = res.job;
          this.dob = res.dateOfBirth.seconds;
          this.country = res.country;
          this.state = res.state;
          this.validPass = res.validPassport;
          this.mariStatus = res.maritalStatus;
          this.gnder = res.gender;
          this.address = res.address;
          this.phone = res.phoneNumber;
          this.photo = res.photoURL;
          console.log(res);
          
        })
      } else {
        this.client = ''
      }
    });
    
    this.getCountry();
  }

  makeEditable() {
    return this.editable.setValue(false)
  }
  makeNonEditable() {
    return this.editable.setValue(true)
  }

  photoChange(e) {
    try {
      this.file = e.target.files[0];
      this.fileName = this.file.name || '';
      this.fileSize = ((this.file.size / 1024) / 1024).toFixed(2) // mb
      if(this.fileSize > '1') {
        return alert("Please profile image size should be less than 1 inclusive")
      } else {
        let reader = new FileReader()
        if(this.file == null || this.file == undefined) {
          // this.uploadBtnDisabled = true;
        } else {
          // this.uploadBtnDisabled = false;
        }
        reader.addEventListener('load', () => {
          let dataUrl = reader.result;
          this.setImage(dataUrl);
          // console.log(dataUrl);
          
        })
        reader.readAsDataURL(this.file);
      }
    } catch (error) {
      
    }
  }

  setImage(url) {
    let imagePlaceholder = this.el.nativeElement.querySelector('.image');
    imagePlaceholder.style.backgroundSize = 'cover'
    imagePlaceholder.style.backgroundPosition = 'center'
    imagePlaceholder.style.backgroundRepeat = 'no-repeat'
    imagePlaceholder.style.backgroundImage = `url('${url}')`;
  }

  public getCountry(){
    this.capi.countries.subscribe((data:  Array<object>) => {
        return this.countries  = data;
    });
  }
}
