import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';


import { AppComponent } from './app.component';
import { SolarComponent } from './solar/solar.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { MainChartComponent } from './solar/main-chart/main-chart.component';
import { TodoComponent } from './todo/todo.component';

@NgModule({
  declarations: [
    AppComponent,
    SolarComponent,
    AboutComponent,
    PageNotFoundComponent,
    HomeComponent,
    MainChartComponent,
    TodoComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    routing,
  ],
  providers: [
    appRoutingProviders,
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
