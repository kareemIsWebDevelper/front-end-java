import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserPostDTO} from "../dto/UserPostDTO";
import {Observable} from "rxjs";
import {CompanyPostDTO} from "../dto/CompanyPostDTO";

@Injectable({
  providedIn: 'root'
})
export class CompanyPostService {

  private companyPostAPI = environment.baseUrl + "/company-posts/";

  constructor(private http: HttpClient) {
  }

  public savePost(companyPostDTO: CompanyPostDTO): Observable<boolean> {
    return this.http.post<boolean>(this.companyPostAPI, companyPostDTO);
  }

  public deletePost(postId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.companyPostAPI + postId);
  }
}
