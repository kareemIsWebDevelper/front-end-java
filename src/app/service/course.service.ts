import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Course} from "../model/Course";
import {environment} from "../../environments/environment";
import {CourseDTO} from "../dto/CourseDTO";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private courseAPI = environment.baseUrl + "/courses/";

  constructor(private http: HttpClient) {
  }

  public getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.courseAPI);
  }

  public getCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(this.courseAPI + courseId);
  }

  public getAllCoursesForUser(userId: Number): Observable<Course[]> {
    return this.http.get<Course[]>(this.courseAPI + "user/" + userId);
  }

  public deleteCourseById(courseId: Number): Observable<Boolean> {
    return this.http.delete<Boolean>(this.courseAPI + courseId);
  }

  public saveCourse(courseDTO: CourseDTO): Observable<Course> {
    return this.http.post<Course>(this.courseAPI, courseDTO);
  }

  public updateCourse(courseId: Number, courseDTO: CourseDTO): Observable<Course> {
    return this.http.put<Course>(this.courseAPI + courseId, courseDTO);
  }
}
