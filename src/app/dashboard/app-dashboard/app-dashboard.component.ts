import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './app-dashboard.component.html',
  styleUrls: ['./app-dashboard.component.scss']
})
export class AppDashboardComponent {

  client: any;
  constructor(private auth: AuthService, private afAuth: AngularFireAuth) {
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    
  }

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
    this.afAuth.authState.subscribe(client => {
      this.auth.clientsData(client.uid).subscribe(res =>{
        this.client = res;
      })
    })
  }

  devMode() {
    return alert('Sorry Pal the app is still in Development mode');
  }
}
