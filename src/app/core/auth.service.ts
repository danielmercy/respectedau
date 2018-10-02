import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import * as firebase from 'firebase/app'
import { AngularFireAuth } from "angularfire2/auth"; 
import { AngularFirestore, AngularFirestoreDocument } from "angularfire2/firestore";

import { Observable, of } from 'rxjs';
import { tap, first, map} from 'rxjs/operators';
import { reject } from 'q';

interface Client {
  uid: string;
  firstname: string;
  lastname: string;
  displayName?: string;
  email: string;
  jobtitle: string;
  dateOfBirth: Date;
  country: string;
  state: string;
  validpassport: string;
  maritalstatus: string;
  gnder: string;
  address: string;
  phone: string;
  photoURL?: string,
  agreed: boolean
}

interface EmailPasswordCredentials {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {

  client: firebase.User;
  currentClient;

  constructor(private router: Router, private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.afAuth.authState.subscribe(client => {
      this.client = client
    })
  }
  

  clientsData(uid) {
      if(uid !== null) {return this.afs.doc(`clients/${uid}`).valueChanges() } else {return;}
  }

  isLoggedIn(withRedirect?: boolean): Observable<boolean> {
    return this.afAuth.authState.pipe(first(),
    map(user => {
      this.currentClient = user;
      return !!user;
    }),
    tap(isLoggedIn => {
      if(!isLoggedIn && withRedirect) {
        this.router.navigateByUrl('/auth/login')
      }
    }))
  }

  setClientData(customData) {
    const path = `clients/${this.currentUserId}`;

    const data = {
      uid: firebase.auth().currentUser.uid,
      firstname: customData.firstname,
      lastname: customData.lastname,
      job: customData.jobtitle,
      dateOfBirth: customData.dateOfBirth,
      country: customData.country,
      state: customData.state,
      validPassport: customData.validpassport,
      maritalStatus: customData.maritalstatus,
      gender: customData.gnder,
      address: customData.address,
      phoneNumber: customData.phone,
      email: firebase.auth().currentUser.email,
      displayName: customData.lastname + ' ' + customData.firstname,
      photoURL: '',
      agreed: customData.agreed
    }

    //SET DATA STORAGE PATH AND PERSIST DATA
    // this.afs.doc(path).set(data, {merge: true})
    this.set(path, data);
  }

  createAccount(credentials: EmailPasswordCredentials) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }

  loginUser(credentials: EmailPasswordCredentials) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }

  // get clientsData() {
  //   return firebase.auth().currentUser
  // }

  get emailVerified() {
    return this.client.emailVerified
  }

  signOut() {
    firebase.auth().signOut()
  }

  resetPassword(email: string) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  }

  verifyEmail() {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().currentUser.sendEmailVerification().then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  // Returns current user
  get currentUser(): any {
    return this.client
  }

  // Returns current user UID
  get currentUserId() {
    return this.client.uid
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.afAuth.authState !== null;
  }

  // Return serverTimestamp
  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp()
  }

  update<T>(ref: any, data: any) {
    return this.afs.doc(ref).update({
      ...data,
      updatedAt: this.timestamp
    })
  }

  set<T>(ref: any, data: any) {
    const timestamp = this.timestamp
    return this.afs.doc(ref).set({
      ...data,
      updatedAt: timestamp,
      createdAt: timestamp
    })
  }
}
