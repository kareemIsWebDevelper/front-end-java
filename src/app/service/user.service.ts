import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {LoginDTO} from "../dto/LoginDTO";
import {Observable} from "rxjs";
import {User} from "../model/User";
import {UserSaveDTO} from "../dto/UserSaveDTO";
import {Company} from "../model/Company";
import {CompanyPost} from "../model/CompanyPost";
import {TimelinePackage} from "../dto/TimelinePackage";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userAPI = environment.baseUrl + "/users/";

  constructor(private http: HttpClient) {
  }

  public userLogin(loginDTO: LoginDTO): Observable<number> {
    return this.http.post<number>(this.userAPI + "login", loginDTO);
  }

  public getUserById(userId: number): Observable<User> {
    return this.http.get<User>(this.userAPI + userId);
  }

  public deleteUserById(userId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.userAPI + userId);
  }

  public saveUser(userSaveDTO: UserSaveDTO): Observable<boolean> {
    return this.http.post<boolean>(this.userAPI, userSaveDTO);
  }

  public updateUser(userId: number, userSaveDTO: UserSaveDTO): Observable<boolean> {
    return this.http.put<boolean>(this.userAPI + userId, userSaveDTO);
  }

  public updateUserAbout(userId: number, about: string): Observable<boolean> {
    return this.http.post<boolean>(this.userAPI + userId + "/about", about);
  }

  public getAllUsersByName(searchKey: string): Observable<User[]> {
    return this.http.get<User[]>(this.userAPI + "search/" + searchKey);
  }

  public isUserFollow(userId: number, followedUserId: number): Observable<boolean> {
    return this.http.get<boolean>(this.userAPI + userId + "/isFollow/" + followedUserId);
  }

  public userFollow(userId: number, followedUserId: number): Observable<boolean> {
    return this.http.get<boolean>(this.userAPI + userId + "/following/" + followedUserId);
  }

  public userUnfollow(userId: number, unfollowedUserId: number): Observable<boolean> {
    return this.http.get<boolean>(this.userAPI + userId + "/unfollowing/" + unfollowedUserId);
  }

  public fetchUserFollowers(userId: number): Observable<User[]> {
    return this.http.get<User[]>(this.userAPI + userId + "/followers");
  }

  public getFollowingUsers(userId: number): Observable<User[]> {
    return this.http.get<User[]>(this.userAPI + userId + "/following-users");
  }

  public getFollowingCompanies(userId: number): Observable<Company[]> {
    return this.http.get<Company[]>(this.userAPI + userId + "/following-companies");
  }

  public getUserAppliedJobsIds(userId: number): Observable<number[]> {
    return this.http.get<number[]>(this.userAPI + userId + "/applied-jobs");
  }

  public getUserPosts(userId: number): Observable<CompanyPost[]> {
    return this.http.get<CompanyPost[]>(this.userAPI + userId + "/posts");
  }

  public getUserTimeline(userId: number): Observable<TimelinePackage> {
    return this.http.get<TimelinePackage>(this.userAPI + userId + "/timeline");
  }
}
