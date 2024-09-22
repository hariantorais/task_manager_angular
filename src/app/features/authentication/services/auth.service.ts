import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ConfigService} from "../../../core/services/config.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'access_token';
  config = inject(ConfigService);
  constructor(private http: HttpClient) { }

  login(loginForm: any): Observable<any>{
    return this.http.post(`${this.config.apiUrl}/login`, loginForm);
  }

  register(registerForm: any): Observable<any>{
    return this.http.post(`${this.config.apiUrl}/register`, registerForm);
  }

  isLoggedIn(): boolean{
    return !!this.getToken();
  }

  storeToken(token: string){
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  storeUser(user: any){
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  getToken(): string | null{
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): any{
    return sessionStorage.getItem('user');
  }

  removeToken(){
    sessionStorage.removeItem(this.TOKEN_KEY);
  }
}
