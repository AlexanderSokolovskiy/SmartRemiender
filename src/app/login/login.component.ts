import { Component, OnInit } from '@angular/core';
import {Server} from '../providers/server';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public server: Server
  ) { }

  onLogin() {

  }

  ngOnInit(): void {
  }

}
