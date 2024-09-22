import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "../../../core/services/config.service";
import {Observable} from "rxjs";
import {IBoard} from "../../../core/models/board.model";

@Injectable({
  providedIn: 'root'
})
export class BoardService {


  constructor(private http: HttpClient, private config: ConfigService) { }

  getBoards(): Observable<any>{
    return this.http.get(`${this.config.apiUrl}/boards`);
  }

  getBoardById(id: number): Observable<any> {
    return this.http.get(`${this.config.apiUrl}/boards/${id}`);
  }

  storeBoard(obj: IBoard): Observable<any> {
    return this.http.post(`${this.config.apiUrl}/boards`, obj);
  }

  updateBoard(id: number, obj: {}): Observable<any> {
    return this.http.put(`${this.config.apiUrl}/boards/${id}`, obj);
  }

  deleteBoard(id: number): Observable<any> {
    return this.http.delete(`${this.config.apiUrl}/boards/${id}`);
  }
}
