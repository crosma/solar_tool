import {Component} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {Location} from '@angular/common';

declare var ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],

})
export class AppComponent {
  private currentRoute: string;

  constructor(router: Router, location: Location) {

    //handle google analytics
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        let newRoute = location.path() || '/';
        if (newRoute != this.currentRoute) {
          ga('send', 'pageview', newRoute);
          this.currentRoute = newRoute;
        }
      }
    });

  }
}
