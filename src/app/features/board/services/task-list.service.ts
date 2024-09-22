import {inject, Injectable} from '@angular/core';
import {ConfigService} from "../../../core/services/config.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TaskListService {
  config = inject(ConfigService);
  constructor(private http : HttpClient) { }

  getTaskLists(): Observable<any> {
    return this.http.get(`${this.config.apiUrl}/task-lists`);
  }

  updateTaskList(id: number, data: any): Observable<any> {
    return this.http.put(`${this.config.apiUrl}/task-lists/${id}`, data);
  }

  storeTaskList(data: any): Observable<any> {
    return this.http.post(`${this.config.apiUrl}/task-lists`, data);
  }

  deleteTaskList(id: number): Observable<any> {
    return this.http.delete(`${this.config.apiUrl}/task-lists/${id}`);
  }

  getTaskListById(id: number): Observable<any> {
    return this.http.get(`${this.config.apiUrl}/task-lists/${id}`);
  }
}
