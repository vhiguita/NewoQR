import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { share } from 'rxjs/operators';
import { ApiService } from '../api/api.service';
import { LoginService } from '../login/login.service';
import { createRequestOption } from 'src/app/shared';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: any;
  private resourceUrl = ApiService.API_URL + '/users';

  constructor(protected http: HttpClient, public apiService: ApiService, public loginService: LoginService) {}

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    this.loginService
      .login(accountInfo)
      .then(res => {
        this.loggedIn(res);
        return of(res);
      })
      .catch(err => {
        console.error('ERROR', err);
        return throwError(err);
      });
  }

  findAll(): Observable<any> {
    return this.apiService.get('users');
  }
  query(req?: any): Observable<HttpResponse<User[]>> {
      const options = createRequestOption(req);
      return this.http.get<User[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    return this.apiService.post('register', accountInfo, { responseType: 'text' as 'text' }).pipe(share());
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this.loginService.logout();
    this.user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  private loggedIn(resp) {
    this.user = resp.user;
  }
}
