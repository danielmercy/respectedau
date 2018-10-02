import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from "../core/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from "angularfire2/storage";
import { AngularFirestore  } from "angularfire2/firestore";
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-email-validation',
  templateUrl: './email-validation.component.html',
  styleUrls: ['./email-validation.component.scss']
})
export class EmailValidationComponent implements OnInit {
  uid: string;
  isLinear = false;
  emailVerifLinkSent: boolean = false;
  emailVerified: boolean = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  file: File = null;
  fileName: string;
  fileSize: string;
  image: string;
  downloadUrl: string;
  uploadPercentage: Observable<number>;
  uploaded: boolean = false;
  uploadBtnDisabled: boolean = true;
  @ViewChild('continue') continue;

  constructor(private auth: AuthService,
    private snapshot: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private el: ElementRef,
    private doc: AngularFirestore,
    private authen: AngularFireAuth
  ) { 
    this.uid = this.snapshot.snapshot.params['uid'];
    this.authen.user.subscribe(res => {
      if(res.emailVerified) {
        this.emailVerified = true;
        this.router.navigateByUrl('/dashboard');
      }
    })
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      photo: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    

    setInterval(() => {
      if(this.emailVerified) {
        this.router.navigateByUrl('/dashboard');
      }
    }, 3000);
  }

  sendVerificationEmail() {
    this.auth.verifyEmail().then((res) => {
      if(this.auth.currentUser.uid == this.uid) {
        // this.router.navigateByUrl('/dashboard')
        this.emailVerifLinkSent = true;
        console.log('Email Verification succesful')
      }
    }).catch(err => {
      console.log('Error verifying your email address')
    })
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
          this.uploadBtnDisabled = true;
        } else {
          this.uploadBtnDisabled = false;
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

  onSubmit() {
    if(this.file.type.split('/')[0] !== 'image') {
      console.log(this.fileName);
      return alert('Only images are allowed')
      
    } else {
      const path = `clients/${this.uid}/${this.fileName}` 
      const task = this.storage.upload(path, this.file);
      this.uploadPercentage = task.percentageChanges();
      console.log(this.uploadPercentage);
      
      
      task.then(res => {
        res.ref.getDownloadURL().then(url => {
          this.image = url;
          this.updateClientImage(url);
        });
        this.uploaded = true;
        this.uploadBtnDisabled = true;
      })
    }  
  }

  setImage(url) {
    let imagePlaceholder = this.el.nativeElement.querySelector('.image');
    imagePlaceholder.style.backgroundSize = 'cover'
    imagePlaceholder.style.backgroundPosition = 'center'
    imagePlaceholder.style.backgroundRepeat = 'no-repeat'
    imagePlaceholder.style.backgroundImage = `url('${url}')`;
  }

  private updateClientImage(url) {
    const path = `clients/${this.uid}`;
    let data = {
      photoURL: url
    }
    this.auth.update(path, data);
  }

}
