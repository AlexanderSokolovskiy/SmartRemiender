import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from './user';
import {Data} from './data';

@Injectable()
export class Server {

  constructor(
    private http: HttpClient,
    private data: Data
  ) {
    console.log('Constructor server');
  }

  onLogin(email: string, password: string): Promise<any> {
    let data = 'username=' + email;
    data = data + '&password=' + password;
    return this.send(environment.BACKEND_SERV + '/auth/jwt/login', data, {
      'Content-Type': 'application/x-www-form-urlencoded'
    });
  }

  getHeaders(): {
    [header: string]: string | string[];
  } {
    const headers = {
      'Content-Type': 'application/json'
    };

    if (this.data.token) {
      // @ts-ignore
      headers.Authorization = 'Bearer ' + this.data.token;
      // @ts-ignore
      headers.accept = 'application/json';
    }

    return headers;
  }

  getUserInfo(): Promise<any> {
    return this.send(environment.BACKEND_SERV + '/users/me');
  }

  send(url: string, data=null, headers=null): Promise<any> {
    if (!headers) {
      headers = this.getHeaders();
    }
    return new Promise<any>(resolve => {
      const handler = (resp) => {
        console.log('Server success: ', resp);
        resolve({status: 200, data: resp});
      };

      const errorHandler = (resp) => {
        console.log('Server error: ', resp);
        resolve(resp);
      };
      if (data) {
        this.http.post(url, data, {'headers': headers}).subscribe(
          handler, errorHandler
        );
      } else {
        this.http.get(url, {'headers': headers}).subscribe(
          handler, errorHandler
        );
      }
    });
  }
}
