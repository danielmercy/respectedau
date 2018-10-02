import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFirestore } from "angularfire2/firestore";
import { AngularFireDatabase } from "angularfire2/database";
import { AuthService } from "./auth.service";
import { PaymentService } from "./payment.service";
import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [AuthService, PaymentService, AuthGuard, AngularFirestore, AngularFireDatabase]
})
export class CoreModule { }
