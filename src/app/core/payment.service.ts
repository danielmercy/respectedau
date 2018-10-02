import { Injectable } from '@angular/core';
import { AngularFirestore } from "angularfire2/firestore";
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class PaymentService {

  clientId: string;
  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) { 
    this.auth.authState.subscribe(auth => {
      if(auth) this.clientId = auth.uid;
    })
  }

  processPayment(token: any, amount) {
    const payment = { token, amount};
    return this.afs.doc(`payments/${this.clientId}`).set(payment)
  }
}
