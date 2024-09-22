import {inject, Injectable} from '@angular/core';
import {IUser} from "../../../core/models/user.model";
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "../../../core/services/config.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  config = inject(ConfigService);

  constructor(
    private http: HttpClient
  ) { }

  storeUser(formUser: IUser): Observable<any>{
    return this.http.post(`${this.config.apiUrl}/users`, formUser);
  }

  updateUser(id: number, formUser: IUser): Observable<any> {
    return this.http.put(`${this.config.apiUrl}/users/${id}`, formUser);
  }

  getUsers(): Observable<any>{
    return this.http.get(`${this.config.apiUrl}/users`);
  }

  getUser(id: number): Observable<any>{
    return this.http.get(`${this.config.apiUrl}/users/${id}`);
  }

  deleteUser(id: number | undefined): Observable<any>{
    return this.http.delete(`${this.config.apiUrl}/users/${id}`);
  }
}
