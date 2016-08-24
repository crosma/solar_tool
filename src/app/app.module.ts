import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {routing, appRoutingProviders} from './app.routing';

//components
import {AppComponent} from './app.component';
import {SolarComponent} from './solar/solar.component';
import {AboutComponent} from './about/about.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

//directives
import {BootstrapTab} from './directives/bootstrap-tab.directive';

@NgModule({
  declarations: [
    AppComponent,
    SolarComponent,
    AboutComponent,
    PageNotFoundComponent,
    BootstrapTab,
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
