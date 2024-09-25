import {inject, Injectable} from '@angular/core';
import {ConfigService} from "../../../core/services/config.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CardMemberService {
  config = inject(ConfigService);
  http = inject(HttpClient);

  storeCardMember(userId: number, cardId: number): Observable<any> {
    return this.http.post(`${this.config.apiUrl}/card-users`, {userId, cardId});
  }

  deleteCardMember(memberId: number, cardId: number): Observable<any> {
    return this.http.post(`${this.config.apiUrl}/card-users/delete-member`, {memberId, cardId});
  }

  getCardMember(id: number): Observable<any> {
    return this.http.get(`${this.config.apiUrl}/card-users/${id}`);
  }

  updateCardMember(id: number, form: any): Observable<any> {
    return this.http.put(`${this.config.apiUrl}/card-users/${id}`, {form});
  }

  getCardMembers(cardId: number): Observable<any> {
    return this.http.get(`${this.config.apiUrl}/card-users/get-card-members/${cardId}`);
  }

}
