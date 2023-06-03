import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message} from "../model/Message";
import {MessageSaveDTO} from "../dto/MessageSaveDTO";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageAPI = environment.baseUrl + "/messages/";

  constructor(private http: HttpClient) {
  }

  public getChat(senderId: number, receiverId: number): Observable<Message[]> {
    return this.http.get<Message[]>(this.messageAPI + senderId + "/chat/" + receiverId);
  }

  public saveMessage(messageSaveDTO: MessageSaveDTO): Observable<boolean> {
    return this.http.post<boolean>(this.messageAPI, messageSaveDTO);
  }
}
