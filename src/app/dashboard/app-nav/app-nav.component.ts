import { Component, TemplateRef, ViewChild} from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import {
  MatBottomSheet,
  MatBottomSheetConfig,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
// import { BottomSheetComponent } from "../bottom-sheet/bottom-sheet.component";

const defaultConfig = new MatBottomSheetConfig();

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss']
})

export class AppNavComponent {
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  client: any
  config: MatBottomSheetConfig = {
    hasBackdrop: defaultConfig.hasBackdrop,
    disableClose: defaultConfig.disableClose,
    backdropClass: defaultConfig.backdropClass,
    direction: 'ltr'
  };

  @ViewChild(TemplateRef) template: TemplateRef<any>;
  @ViewChild('drawer') drw: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private afAuth: AngularFireAuth,
    private _bottomSheet: MatBottomSheet) {
  }

  // openComponent() {
  //   this._bottomSheet.open(BottomSheetComponent, this.config);
  // }

  // openTemplate() {
  //   this._bottomSheet.open(this.template, this.config);
  // }

  closeOnNav() {
    if(!this.isHandset) {
      this.drw.close()
    }
  }

  signOut() {
    this.auth.signOut()
    this.router.navigateByUrl('/');
  }

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
    this.afAuth.authState.subscribe(client => {
      this.auth.clientsData(client.uid).subscribe(res => {
        this.client = res;
      })
    })
  }
 
}
