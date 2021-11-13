import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { RegisterComponent } from './components/register/register.component';
import { MonitorChartComponent } from './components/monitor-chart/monitor-chart.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { IncidentListComponent } from './components/incident-list/incident-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/signin' },
  { path: 'signin', component: SigninComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'monitor', component: MonitorChartComponent },
  { path: 'patient-list', component: PatientListComponent },
  { path: 'incident-list', component: IncidentListComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
