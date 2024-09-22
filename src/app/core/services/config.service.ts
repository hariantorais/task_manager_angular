import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  apiUrl: string = "http://localhost:8000/api";
  getToken():string | null {
    return localStorage.getItem('token');
  }
  constructor() { }
}
