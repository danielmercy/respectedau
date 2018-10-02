import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FlexLayoutModule } from "@angular/flex-layout";

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AppDashboardComponent } from './app-dashboard/app-dashboard.component';
import { AppNavComponent } from './app-nav/app-nav.component';
import { MaterialModule } from '../Material/material.module';
import { PreferencesComponent } from './preferences/preferences.component';
import { MessagesComponent } from './messages/messages.component';
import { AccountComponent } from './account/account.component';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgCircleProgressModule.forRoot(),
    DashboardRoutingModule
  ],
  declarations: [AppDashboardComponent, AppNavComponent, PreferencesComponent, MessagesComponent, AccountComponent, NotificationsComponent]
})
export class DashboardModule { }
