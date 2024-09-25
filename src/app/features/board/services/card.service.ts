import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ICard} from "../../../core/models/card.model";
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "../../../core/services/config.service";

@Injectable({
  providedIn: 'root'
})
export class CardService {
  config = inject(ConfigService);
  constructor(private http: HttpClient) { }

  storeCard(taskListId: number, title: string): Observable<any> {
    return this.http.post(this.config.apiUrl + '/cards', {
      taskListId, title
    });
  }

  updateCard(taskListId: number, card: ICard): Observable<any> {
    return this.http.put(this.config.apiUrl + '/cards/' + card.id, {
      taskListId, ...card
    });
  }

  moveCard(cardId: number, newListId: number): Observable<any> {
    return this.http.put(`${this.config.apiUrl}/cards/${cardId}/move`, {newListId})
  }

  deleteCard(cardId: number): Observable<any>{
    return this.http.delete(`${this.config.apiUrl}/cards/${cardId}`)
  }

  getCard(cardId: number): Observable<any> {
    return this.http.get(`${this.config.apiUrl}/cards/${cardId}`)
  }

}
