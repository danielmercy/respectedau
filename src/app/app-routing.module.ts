import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, CanActivate } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { OurServicesComponent } from "./our-services/our-services.component";
import { TestimoniesComponent } from "./testimonies/testimonies.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { EmailValidationComponent } from "./email-validation/email-validation.component";
import { AuthGuard } from "./core/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },{
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },{
    path: 'services',
    component: OurServicesComponent
  },{
    path: 'testimonies',
    component: TestimoniesComponent
  },{
    path: 'contactus',
    component: ContactUsComponent
  },{
    path: 'auth/login',
    component: LoginComponent,
    canActivate: []
  },{
    path: 'auth/registration',
    component: RegistrationComponent
  },{
    path: 'auth/:uid/verify',
    component: EmailValidationComponent
  },{
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
