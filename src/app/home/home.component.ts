import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from "../core/auth.service";
import { AngularFireAuth } from 'angularfire2/auth';
import { NotificationService, ALERT_TYPES } from '../notification/notification.service';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  clientData;
  constructor(private auth: AuthService, private afAuth: AngularFireAuth, private alert: NotificationService) { 
   }

  ngOnInit() {
    this.alert.open(ALERT_TYPES.SUCCESS, {
      code: 'auth/network-request-failed',
      message: 'You\'ve successfully started building your apps your self'
    })
  }
  
  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.afAuth.authState.subscribe(client => {
      if(client) {
        this.auth.clientsData(client.uid).subscribe(res =>{
          this.clientData = res;
        })
      } else {
        this.clientData = '';
      }
    })
    
  }

  get client() {
    return this.clientData
  }

}
