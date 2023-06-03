import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserPostDTO} from "../dto/UserPostDTO";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserPostService {

  private userPostAPI = environment.baseUrl + "/user-posts/";

  constructor(private http: HttpClient) {
  }

  public savePost(userPostDTO: UserPostDTO): Observable<boolean> {
    return this.http.post<boolean>(this.userPostAPI, userPostDTO);
  }

  public deletePost(postId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.userPostAPI + postId);
  }
}
