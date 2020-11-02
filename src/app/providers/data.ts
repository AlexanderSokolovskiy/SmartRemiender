import {Injectable} from '@angular/core';
import {LocalStorageService} from 'angular-web-storage';
import {UserInfo} from '../data_type';

@Injectable()
export class Data {

  token: string;

  constructor(
    private storage: LocalStorageService
  ) {
    console.log('Constructor data');
  }

  set(key, value): void {
    this.storage.set(key, value);
  }

  get(key): any {
    return this.storage.get(key);
  }

  saveUserToken(token: string): Promise<void> {
    this.token = token;
    return new Promise<void>(resolve => {
      this.setUserInfo({'token': token});
      resolve();
    });
  }

  getUserInfo(): UserInfo {
    return JSON.parse(this.get('user_info')) || {};
  }

  setUserInfo(data, force=false): void {
    if (force) {
      this.set('user_info', JSON.stringify(data));
    } else {
      const userInfo = JSON.parse(this.get('user_info')) || {};
      this.set('user_info', JSON.stringify({...userInfo,...data}));
    }
  }

}
