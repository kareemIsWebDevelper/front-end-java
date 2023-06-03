import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectDTO} from "../../dto/ProjectDTO";
import {ProjectService} from "../../service/project.service";
import {Project} from "../../model/Project";

@Component({
  selector: 'app-project-submission',
  templateUrl: './project-submission.component.html',
  styleUrls: ['./project-submission.component.css']
})
export class ProjectSubmissionComponent implements OnInit {

  public projectDTO: ProjectDTO = new ProjectDTO();

  public projectId: Number = -1;

  constructor(private projectService: ProjectService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.projectDTO.userId=Number(localStorage.getItem("id"));
    const idIsPresent = this.activatedRoute.snapshot.paramMap.has('id');
    if (idIsPresent) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.projectId = Number(id);
      this.projectService.getProjectById(id as unknown as number).subscribe(
        (data) => {
          this.setEducationDataToEducationDTO(data);
        }
      )
    }
  }

  saveOrUpdateProject(){
    if (this.projectId != -1) {
      this.projectService.updateProject(this.projectId, this.projectDTO).subscribe(
        (response) => {
          if (!response) {
            console.log("Can't update project data")
          } else {
            this.router.navigateByUrl("/user-profile").then(value => console.log("Project data updated successfully"))
          }
        }
      )
    } else {
      this.projectService.saveProject(this.projectDTO).subscribe(
        (response) => {
          if (!response) {
            console.log("Can't save project data")
          } else {
            this.router.navigateByUrl("/user-profile").then(value => console.log("Project data saved successfully"))
          }
        }
      );
    }
  }

  private setEducationDataToEducationDTO(project: Project) {
    this.projectDTO.projectDescription=project.projectDescription;
    this.projectDTO.projectLink=project.projectLink;
    this.projectDTO.projectName=project.projectName;
  }
}
