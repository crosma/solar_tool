import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {routing, appRoutingProviders} from './app.routing';

//components
import {AppComponent} from './app.component';
import {IndexComponent} from './index/index.component';
import {SolarComponent} from './solar/solar.component';
import {AboutComponent} from './about/about.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

//directives
import {BootstrapTab} from './directives/bootstrap-tab.directive';

//services
import {BatteriesService, ConsumersService, UserSettingsService, JunkService} from './services';


@NgModule({
  declarations: [
    AppComponent,
    SolarComponent,
    AboutComponent,
    PageNotFoundComponent,
    BootstrapTab,
    IndexComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
  ],
  providers: [
    appRoutingProviders,
    BatteriesService,
    ConsumersService,
    UserSettingsService,
    JunkService
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
