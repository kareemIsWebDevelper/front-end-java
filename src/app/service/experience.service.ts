import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Experience} from "../model/Experience";
import {ExperienceDTO} from "../dto/ExperienceDTO";

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private experienceAPI = environment.baseUrl + "/experience/";

  constructor(private http: HttpClient) {
  }

  public getAllExperience(): Observable<Experience[]> {
    return this.http.get<Experience[]>(this.experienceAPI);
  }

  public getExperienceById(experienceId: number): Observable<Experience> {
    return this.http.get<Experience>(this.experienceAPI + experienceId);
  }

  public getAllExperienceForUser(userId: number): Observable<Experience[]> {
    return this.http.get<Experience[]>(this.experienceAPI + "user/" + userId);
  }

  public deleteExperienceById(experienceId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.experienceAPI + experienceId);
  }

  public saveExperience(experienceDTO: ExperienceDTO): Observable<Experience> {
    return this.http.post<Experience>(this.experienceAPI, experienceDTO);
  }

  public updateExperience(experienceId: number, experienceDTO: ExperienceDTO): Observable<Experience> {
    return this.http.put<Experience>(this.experienceAPI + experienceId, experienceDTO);
  }
}
