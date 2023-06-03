import {Component, OnInit} from '@angular/core';
import {JobDTO} from "../../dto/JobDTO";
import {JobService} from "../../service/job.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-job-submission',
  templateUrl: './job-submission.component.html',
  styleUrls: ['./job-submission.component.css']
})
export class JobSubmissionComponent implements OnInit {

  public jobDTO: JobDTO = new JobDTO();

  constructor(private jobService: JobService, private router: Router) {
  }

  ngOnInit(): void {
    this.jobDTO.companyId = Number(localStorage.getItem("id"));
    console.log(this.jobDTO.companyId);
  }

  saveJob() {
    this.jobDTO.date=Date.now().toString();
    this.jobService.saveJob(this.jobDTO).subscribe(
      (response) => {
        if (response) {
          this.router.navigateByUrl('/company-jobs/'+this.jobDTO.companyId).then(() => console.log("Job saved successfully"));
        } else {
          console.log("Failed to save job");
        }
      }
    )
  }
}
