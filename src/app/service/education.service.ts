import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Education} from "../model/Education";
import {EducationDTO} from "../dto/EducationDTO";

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  private educationAPI = environment.baseUrl + "/education/";

  constructor(private http: HttpClient) {
  }

  public getAllEducation(): Observable<Education[]> {
    return this.http.get<Education[]>(this.educationAPI);
  }

  public getEducationById(educationId: number): Observable<Education> {
    return this.http.get<Education>(this.educationAPI + educationId);
  }

  public getAllEducationForUser(userId: Number): Observable<Education[]> {
    return this.http.get<Education[]>(this.educationAPI + "user/" + userId);
  }

  public deleteEducationById(educationId: Number): Observable<Boolean> {
    return this.http.delete<Boolean>(this.educationAPI + educationId);
  }

  public saveEducation(educationDTO: EducationDTO): Observable<Education> {
    return this.http.post<Education>(this.educationAPI, educationDTO);
  }

  public updateEducation(educationId: Number, educationDTO: EducationDTO): Observable<Education> {
    return this.http.put<Education>(this.educationAPI + educationId, educationDTO);
  }
}
