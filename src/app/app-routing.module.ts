import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddCommuteComponent } from './add-commute/add-commute.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path:'', component:LandingComponent },
  { path:'login', component:LoginComponent },
  { path:'register', component:RegisterComponent},
  { path:'dashboard', component:DashboardComponent },
  { path:'add-commute', component:AddCommuteComponent },
  { path:'**', redirectTo:'' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
