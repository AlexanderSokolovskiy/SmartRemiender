import { Component } from '@angular/core';
import {User} from './providers/user';
import {Data} from './providers/data';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fastApiFront';

  constructor(
    public data: Data,
    public user: User,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log('Construct app');
    this.init();
  }

  init(): void {
    if(!this.user.loggedIn) {
      this.navigateTo('login');
    } else {
      if (window.location.href.split('/').slice(3).join('/') === 'login') {
        this.navigateTo('welcome');
      } else {
        this.navigateTo(window.location.href.split('/').slice(3).join('/'));
      }
    }

  }

  navigateTo(url: string): void {
    this.router.navigateByUrl(url).then(successNav => {
      if (successNav) {
        console.log('Success nav to : ', url);
      } else {
        console.log('Error while navigate to : ', url);
      }
    });
  }
}
