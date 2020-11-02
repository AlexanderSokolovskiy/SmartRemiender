import {Injectable} from '@angular/core';
import {Server} from './server';
import {Data} from './data';
import {UserInfo} from '../data_type';

@Injectable()
export class User {

  loggedIn = false;
  email: string;
  isSuperuser: boolean;


  constructor(
    public server: Server,
    public data: Data
  ) {
    console.log('Constructor user');
    const userInfo = this.data.getUserInfo();
    this.loggedIn = userInfo.loggedIn || false;
    this.email = userInfo.email || '';
    this.isSuperuser = userInfo.is_superuser || false;
    console.log('logged in : ', this.loggedIn);

  }

  login(username, password): Promise<any> {
    return new Promise<any>(resolve => {
      this.server.onLogin(username, password).then(resp => {
        if (resp.status !== 200) {
          console.log(resp.error);
          resolve(resp.error);
        } else {
          this.loggedIn = true;

          this.data.saveUserToken(resp.data.access_token).then(r => {
            this.server.getUserInfo().then((info) => {
              console.log('User info: ', info.data);
              if (info.data) {
                this.data.setUserInfo({...info.data, loggedIn: true});
              }
              resolve(!info.data);
            });
          });
        }
      });
    });
  }

  logout(): Promise<any> {
    return new Promise<any>(resolve => {
      this.data.setUserInfo({}, true);
      this.loggedIn = false;
      resolve();
    });
  }
}
