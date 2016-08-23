import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';

//components
import { AppComponent } from './app.component';
import { SolarComponent } from './solar/solar.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainChartComponent } from './solar/main-chart/main-chart.component'; //TODO: Probably does not need to be global
import { ConsumersComponent } from './solar/consumers/consumers.component'; //TODO: Probably does not need to be global

//directives
import { BootstrapTab } from './directives/bootstrap-tab.directive';

@NgModule({
  declarations: [
    AppComponent,
    SolarComponent,
    AboutComponent,
    PageNotFoundComponent,
    MainChartComponent,
    BootstrapTab,
    ConsumersComponent,
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
