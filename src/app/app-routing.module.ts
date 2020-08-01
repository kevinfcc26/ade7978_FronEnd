import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VoltageComponent } from './components/voltage/voltage.component';
import { CurrentComponent } from './components/current/current.component';
import { PowerAComponent } from './components/power-a/power-a.component';
import { PowerBComponent } from './components/power-b/power-b.component';
import { PowerCComponent } from './components/power-c/power-c.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'voltage', component: VoltageComponent},
  { path: 'current', component: CurrentComponent},
  { path: 'powerA', component: PowerAComponent},
  { path: 'powerB', component: PowerBComponent},
  { path: 'powerC', component: PowerCComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
