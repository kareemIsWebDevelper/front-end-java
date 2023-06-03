import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {JobDTO} from "../dto/JobDTO";
import {Observable} from "rxjs";
import {User} from "../model/User";
import {UserJobsPackage} from "../dto/UserJobsPackage";

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private jobAPI = environment.baseUrl + "/jobs/";

  constructor(private http: HttpClient) {
  }

  public saveJob(jobDTO: JobDTO): Observable<boolean> {
    return this.http.post<boolean>(this.jobAPI, jobDTO);
  }

  public deleteJob(jobId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.jobAPI + jobId);
  }

  public fetchJobApplicants(jobId: number): Observable<User[]> {
    return this.http.get<User[]>(this.jobAPI + jobId + "/applicants");
  }

  public applyJob(userId: number, jobId: number): Observable<boolean> {
    return this.http.get<boolean>(this.jobAPI + jobId + "/" + userId);
  }

  public isUserApplied(userId: number, jobId: number): Observable<boolean> {
    return this.http.get<boolean>(this.jobAPI + jobId + "/isApplied/" + userId);
  }

  public fetchAllJobsForUser(userId: number): Observable<UserJobsPackage> {
    return this.http.get<UserJobsPackage>(this.jobAPI + userId + "/all-jobs");
  }
}
