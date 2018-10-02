import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AppDashboardComponent } from "./app-dashboard/app-dashboard.component";
import { PreferencesComponent } from "./preferences/preferences.component";
import { AccountComponent } from "./account/account.component";
import { MessagesComponent } from "./messages/messages.component";
import { AppNavComponent } from "./app-nav/app-nav.component";
import { AuthGuard } from '../core/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: AppNavComponent,
    children: [
      {
        path: '',
        component: AppDashboardComponent
      },{
        path: 'account',
        component: AccountComponent
      },{
        path: 'messages',
        component: MessagesComponent
      },{
        path: 'settings',
        component: PreferencesComponent
      }
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
