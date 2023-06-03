import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Project} from "../model/Project";
import {ProjectDTO} from "../dto/ProjectDTO";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectAPI = environment.baseUrl + "/projects/";

  constructor(private http: HttpClient) {
  }

  public getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectAPI);
  }

  public getProjectById(projectId: number): Observable<Project> {
    return this.http.get<Project>(this.projectAPI + projectId);
  }

  public getAllProjectsForUser(userId: Number): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectAPI + "user/" + userId);
  }

  public deleteProjectById(projectId: Number): Observable<Boolean> {
    return this.http.delete<Boolean>(this.projectAPI + projectId);
  }

  public saveProject(projectDTO: ProjectDTO): Observable<Project> {
    return this.http.post<Project>(this.projectAPI, projectDTO);
  }

  public updateProject(projectId: Number, projectDTO: ProjectDTO): Observable<Project> {
    return this.http.put<Project>(this.projectAPI + projectId, projectDTO);
  }
}
