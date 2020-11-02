import { Component, OnInit } from '@angular/core';
import {User} from '../providers/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(
    public user: User,
    public router: Router
  ) {
    console.log('Construct welcome');
  }

  ngOnInit(): void {
    console.log('On init welcome');
  }

  logout(): void {
    this.user.logout().then(e => {
      console.log('logout');
      this.router.navigateByUrl('');
    });
  }

}
