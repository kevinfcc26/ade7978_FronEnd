import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VoltageComponent } from './components/voltage/voltage.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'voltage', component: VoltageComponent},
  { path: 'current', component: VoltageComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'heroes'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
