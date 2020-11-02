import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {Server} from './providers/server';
import {ReactiveFormsModule} from '@angular/forms';
import {User} from './providers/user';
import {AppRoutingModule} from './app-routing.modules';
import {Data} from './providers/data';
import {LoginComponent} from './login/login.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    Server,
    User,
    Data,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
