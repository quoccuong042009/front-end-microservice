import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { TOKEN_NAME } from '../services/user/auth.constant';
import { JwtHelperService } from '@auth0/angular-jwt'

import {UserService} from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuardGuard implements CanActivate {
	jwtHelper: JwtHelperService = new JwtHelperService();

	constructor(private router: Router,
							private userService: UserService,
							private cookieService: CookieService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
			if (this.userService.isLoggedIn()) {
				const decodedToken = this.jwtHelper.decodeToken(this.cookieService.get(TOKEN_NAME));

				if(decodedToken.authorities[0] === 'ADMIN'){
					this.router.navigate(['order-error']);
					return false;
				}
				else{
					return true;
				}
	    } else {
	      this.router.navigate(['login'], {queryParams: {redirectTo: state.url}});
	      return false;
	    }
  }
}
