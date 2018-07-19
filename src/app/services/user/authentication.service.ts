import { Injectable, Output, EventEmitter } from '@angular/core';
// import { Headers, Http} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import {TOKEN_AUTH_PASSWORD, TOKEN_AUTH_USERNAME} from './auth.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
	private userUrl = 'http://localhost:8765';
	// private userUrl = 'http://localhost:8765/user-service';
	private LoggedIn: boolean = false;
	private userName: string;

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
		const url = `${this.userUrl}/${'oauth/token'}`;
		const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&grant_type=password`;
		const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD)
        })
    };

    return this.http.post(url, body, httpOptions)
      .pipe(map((res: any) => {
        if (res.access_token) {
          return res.access_token;
        }
        return null;
      }));

  }
}
