import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { AuthService } from "../core/auth.service";
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
    client;
  constructor(private el: ElementRef, private renderer: Renderer2, private auth: AuthService, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    let menuBtn = this.el.nativeElement.querySelector('#menu-btn');
    let navMenu = this.el.nativeElement.querySelector('.mobile-menu');
    try {
        menuBtn.addEventListener('click', () => {
            if(navMenu.classList.contains('hidden')) {
                navMenu.classList.remove('hidden');
                navMenu.classList.add('visible');
            } else if(navMenu.classList.contains('visible')) {
                navMenu.classList.remove('visible');
                navMenu.classList.add('hidden');
            } else {
                console.error("An error occurred while trying to load the menu!!");
            }
        })
    } catch (error) {
        console.log('Sorry, your navigation menu work in progress');
    }
  }

  ngAfterViewInit() {
      //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
      //Add 'implements AfterViewInit' to the class.
      this.afAuth.authState.subscribe(client => {
          if(client) {
            this.auth.clientsData(client.uid).subscribe(res => {
                this.client = res;
            })
          } else {
              this.client = ''
          }
      })
  }


  logout() {
    this.afAuth.auth.signOut()
  }


}
