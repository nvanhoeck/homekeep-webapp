import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
// tslint:disable-next-line:ban-types
declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G-XQ43KMH87P', {
          page_path: event.urlAfterRedirects
        });
      }
    });
  }
}
