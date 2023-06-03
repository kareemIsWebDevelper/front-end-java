import {Component, OnInit} from '@angular/core';
import {EducationDTO} from "../../dto/EducationDTO";
import {EducationService} from "../../service/education.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Education} from "../../model/Education";

@Component({
  selector: 'app-education-submission',
  templateUrl: './education-submission.component.html',
  styleUrls: ['./education-submission.component.css']
})
export class EducationSubmissionComponent implements OnInit {

  public educationDTO: EducationDTO = new EducationDTO();

  public educationId: Number = -1;

  constructor(private educationService: EducationService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.educationDTO.userId=Number(localStorage.getItem("id"));
    const idIsPresent = this.activatedRoute.snapshot.paramMap.has('id');
    if (idIsPresent) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.educationId = Number(id);
      this.educationService.getEducationById(id as unknown as number).subscribe(
        (data) => {
          this.setEducationDataToEducationDTO(data);
        }
      )
    }
  }

  saveOrUpdateEducation() {
      if (this.educationId != -1) {
        this.educationService.updateEducation(this.educationId, this.educationDTO).subscribe(
          (response) => {
            if (!response) {
              console.log("Can't update education data")
            } else {
              this.router.navigateByUrl("/user-profile").then(value => console.log("Education data updated successfully"))
            }
          }
        )
      } else {
        this.educationService.saveEducation(this.educationDTO).subscribe(
          (response) => {
            if (!response) {
              console.log("Can't save education data")
            } else {
              this.router.navigateByUrl("/user-profile").then(value => console.log("Education data saved successfully"))
            }
          }
        );
      }
  }

  private setEducationDataToEducationDTO(education:Education) {
    this.educationDTO.educationPlace=education.educationPlace;
    this.educationDTO.educationDegree=education.educationDegree;
    this.educationDTO.startDate=education.startDate;
    this.educationDTO.endDate=education.endDate;
    this.educationDTO.studyField=education.studyField;
  }
}
