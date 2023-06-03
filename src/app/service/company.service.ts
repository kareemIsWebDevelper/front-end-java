import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginDTO} from "../dto/LoginDTO";
import {Company} from "../model/Company";
import {CompanySaveDTO} from "../dto/CompanySaveDTO";
import {User} from "../model/User";
import {Job} from "../model/Job";
import {CompanyPost} from "../model/CompanyPost";
import {TimelinePackage} from "../dto/TimelinePackage";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companyAPI = environment.baseUrl + "/companies/";

  constructor(private http: HttpClient) {
  }

  public companyLogin(loginDTO: LoginDTO): Observable<number> {
    return this.http.post<number>(this.companyAPI + "login", loginDTO);
  }

  public getCompanyById(companyId: number): Observable<Company> {
    return this.http.get<Company>(this.companyAPI + companyId)
  }

  public saveCompany(companySaveDTO: CompanySaveDTO): Observable<boolean> {
    return this.http.post<boolean>(this.companyAPI, companySaveDTO);
  }

  public deleteCompanyById(companyId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.companyAPI + companyId);
  }

  public updateCompany(companyId: number, companySaveDTO: CompanySaveDTO): Observable<boolean> {
    return this.http.put<boolean>(this.companyAPI + companyId, companySaveDTO);
  }

  public getAllCompaniesByName(searchKey: string): Observable<Company[]> {
    return this.http.get<Company[]>(this.companyAPI + "search/" + searchKey);
  }

  public isCompanyFollow(userId: number, companyId: number): Observable<boolean> {
    return this.http.get<boolean>(this.companyAPI + userId + "/isFollow/" + companyId);
  }

  public companyFollow(userId: number, companyId: number): Observable<boolean> {
    return this.http.get<boolean>(this.companyAPI + userId + "/following/" + companyId);
  }

  public companyUnfollow(userId: number, companyId: number): Observable<boolean> {
    return this.http.get<boolean>(this.companyAPI + userId + "/unfollowing/" + companyId);
  }

  public fetchCompanyFollowers(companyId: number): Observable<User[]> {
    return this.http.get<User[]>(this.companyAPI + companyId + "/followers");
  }

  public fetchCompanyJobs(companyId: number): Observable<Job[]> {
    return this.http.get<Job[]>(this.companyAPI + companyId + "/jobs");
  }

  public getCompanyPosts(companyId: number): Observable<CompanyPost[]> {
    return this.http.get<CompanyPost[]>(this.companyAPI + companyId + "/posts");
  }

  public getCompanyTimeline(companyId: number): Observable<TimelinePackage> {
    return this.http.get<TimelinePackage>(this.companyAPI + companyId + "/timeline");
  }
}
