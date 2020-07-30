import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartComponent } from './components/chart/chart.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { VoltageComponent } from './components/voltage/voltage.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    NavbarComponent,
    VoltageComponent
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
