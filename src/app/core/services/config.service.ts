import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  apiUrl: string = "https://task-api.hariantorais.my.id/api";

  // apiUrl: string = "http://localhost:8000/api";

  constructor() { }
}
