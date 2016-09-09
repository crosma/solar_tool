import {Routes, RouterModule} from '@angular/router';

//import components
import {IndexComponent}  from './index/index.component';
import {SolarComponent}  from './solar/solar.component';
import {AboutComponent}  from './about/about.component';
import {PageNotFoundComponent}  from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {
    path: '',
    component: IndexComponent
  },

  {
    path: 'calculator',
    component: SolarComponent
  },

  {
    path: 'about',
    component: AboutComponent
  },

  {
    path: '**',
    component: PageNotFoundComponent
  },
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(appRoutes);
