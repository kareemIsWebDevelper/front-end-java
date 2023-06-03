import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CourseDTO} from "../../dto/CourseDTO";
import {CourseService} from "../../service/course.service";
import {Course} from "../../model/Course";

@Component({
  selector: 'app-course-submission',
  templateUrl: './course-submission.component.html',
  styleUrls: ['./course-submission.component.css']
})
export class CourseSubmissionComponent implements OnInit {

  public courseDTO: CourseDTO = new CourseDTO();

  public courseId: Number = -1;

  constructor(private courseService: CourseService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.courseDTO.userId = Number(localStorage.getItem("id"));
    const idIsPresent = this.activatedRoute.snapshot.paramMap.has('id');
    if (idIsPresent) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.courseId = Number(id);
      this.courseService.getCourseById(id as unknown as number).subscribe(
        (data) => {
          this.setEducationDataToEducationDTO(data);
        }
      )
    }
  }

  saveOrUpdateCourse() {
    if (this.courseId != -1) {
      this.courseService.updateCourse(this.courseId, this.courseDTO).subscribe(
        (response) => {
          if (!response) {
            console.log("Can't update course data")
          } else {
            this.router.navigateByUrl("/user-profile").then(value => console.log("Course data updated successfully"))
          }
        }
      )
    } else {
      this.courseService.saveCourse(this.courseDTO).subscribe(
        (response) => {
          if (!response) {
            console.log("Can't save course data")
          } else {
            this.router.navigateByUrl("/user-profile").then(value => console.log("Course data saved successfully"))
          }
        }
      );
    }
  }

  private setEducationDataToEducationDTO(course: Course) {
    this.courseDTO.courseName = course.courseName;
    this.courseDTO.courseProvider = course.courseProvider;
  }
}
