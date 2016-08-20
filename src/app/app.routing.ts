import { Routes, RouterModule } from '@angular/router';

//import components
import { HomeComponent }  from './home/home.component';
import { SolarComponent }  from './solar/solar.component';
import { AboutComponent }  from './about/about.component';
import { TodoComponent }  from './todo/todo.component';
import { PageNotFoundComponent }  from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {
    path: '',
    component: SolarComponent
  },

  {
    path: 'solar',
    component: SolarComponent
  },

  {
    path: 'todo',
    component: TodoComponent
  },

  {
    path: 'about',
    component: AboutComponent
  },

  { path: '**', component: PageNotFoundComponent },
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);
