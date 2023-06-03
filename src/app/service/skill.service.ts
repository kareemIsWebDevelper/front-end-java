import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Skill} from "../model/Skill";
import {SkillDTO} from "../dto/SkillDTO";

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private skillAPI = environment.baseUrl + "/skills/";

  constructor(private http: HttpClient) {
  }

  public getAllSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.skillAPI);
  }

  public getAllSkillsForUser(userId: Number): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.skillAPI + "user/" + userId);
  }

  public deleteSkillById(skillId:Number):Observable<Boolean>{
    return this.http.delete<Boolean>(this.skillAPI+skillId);
  }

  public saveSkill(skillDTO: SkillDTO): Observable<Skill> {
    return this.http.post<Skill>(this.skillAPI, skillDTO);
  }
}
