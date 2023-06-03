import {Component, OnInit} from '@angular/core';
import {ExperienceDTO} from "../../dto/ExperienceDTO";
import {ActivatedRoute, Router} from "@angular/router";
import {ExperienceService} from "../../service/experience.service";
import {Experience} from "../../model/Experience";

@Component({
  selector: 'app-experience-submission',
  templateUrl: './experience-submission.component.html',
  styleUrls: ['./experience-submission.component.css']
})
export class ExperienceSubmissionComponent implements OnInit {

  public experienceDTO: ExperienceDTO = new ExperienceDTO();

  public experienceId: number = -1;

  public isStillWorkingThere = 0;

  constructor(private experienceService: ExperienceService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.experienceDTO.userId = Number(localStorage.getItem("id"));
    const idIsPresent = this.activatedRoute.snapshot.paramMap.has('id');
    if (idIsPresent) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.experienceId = Number(id);
      this.experienceService.getExperienceById(id as unknown as number).subscribe(
        (data) => {
          this.setEducationDataToEducationDTO(data);
        }
      )
    }
  }

  saveOrUpdateExperience() {
    if (this.isStillWorkingThere == 1) {
      this.experienceDTO.endDate="Present";
    }
    if (this.experienceId != -1) {
      this.experienceService.updateExperience(this.experienceId, this.experienceDTO).subscribe(
        (response) => {
          if (!response) {
            console.log("Can't update experience data")
          } else {
            this.router.navigateByUrl("/user-profile").then(value => console.log("Experience data updated successfully"))
          }
        }
      )
    } else {
      this.experienceService.saveExperience(this.experienceDTO).subscribe(
        (response) => {
          if (!response) {
            console.log("Can't save experience data")
          } else {
            this.router.navigateByUrl("/user-profile").then(value => console.log("Experience data saved successfully"))
          }
        }
      );
    }
  }

  private setEducationDataToEducationDTO(experience: Experience) {
    this.experienceDTO.experiencePosition = experience.experiencePosition;
    this.experienceDTO.experiencePlace = experience.experiencePlace;
    this.experienceDTO.startDate = experience.startDate;
    this.experienceDTO.endDate = experience.endDate;
  }
}
