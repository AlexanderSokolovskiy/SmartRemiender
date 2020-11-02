import { Component, OnInit } from '@angular/core';
import {Server} from '../providers/server';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../providers/user';
import {Data} from '../providers/data';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formG: FormGroup;

  constructor(
    public server: Server,
    public user: User,
    public data: Data,
    public router: Router
  ) {
    console.log('Construct login');
    this.formG = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(2), Validators.required]),
    });
  }

  get email(): string {return this.formG.get('email').value;}
  get password(): string {return this.formG.get('password').value;}

  onLogin(): void {
    this.user.login(this.email, this.password).then(errors => {
      if (!errors) {
        this.router.navigateByUrl('welcome');
      }
    });
  }

  ngOnInit(): void {
    console.log('On init login');
  }

}
