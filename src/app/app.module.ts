import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { VoltageComponent } from './components/voltage/voltage.component';
import { CurrentComponent } from './components/current/current.component';
import { PowerAComponent } from './components/power-a/power-a.component';
import { PowerBComponent } from './components/power-b/power-b.component';
import { PowerCComponent } from './components/power-c/power-c.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    VoltageComponent,
    CurrentComponent,
    PowerAComponent,
    PowerBComponent,
    PowerCComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
