import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  apiUrl: string = "https://task-api.hariantorais.my.id/api";

  constructor() { }
}
