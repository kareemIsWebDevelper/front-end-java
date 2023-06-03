import {Component, OnInit} from '@angular/core';
import {Company} from "../../model/Company";
import {CompanyService} from "../../service/company.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Job} from "../../model/Job";
import {JobService} from "../../service/job.service";
import {User} from "../../model/User";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-company-jobs',
  templateUrl: './company-jobs.component.html',
  styleUrls: ['./company-jobs.component.css']
})
export class CompanyJobsComponent implements OnInit {
  public id = Number(localStorage.getItem("id"));
  public company: Company = new Company();
  public visitedId = -1;
  public userViewer = false;
  public sameCompany = false;
  public companyActionVisibilityStyle = "hidden"
  public jobs: Job[] = [];
  public deleteDisplayStyle = "none";
  private selectedDeleteJobId: number;
  public applicantsDisplayStyle = "none";
  public applicants: User[] = [];
  public userAppliedJobsIds: number[] = [];

  constructor(private companyService: CompanyService, private jobService: JobService, private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const idIsPresent = this.activatedRoute.snapshot.paramMap.has('id');
    if (idIsPresent) {
      const visitedId = this.activatedRoute.snapshot.paramMap.get('id');
      this.visitedId = visitedId as unknown as number;
      if (localStorage.getItem("type") == "user") {
        this.setAllNeededData(this.visitedId);
        this.companyActionVisibilityStyle = "hidden";
        this.userViewer = true;
        this.userService.getUserAppliedJobsIds(Number(localStorage.getItem("id"))).subscribe(
          (ids) => {
            this.userAppliedJobsIds = ids;
          }
        )
      } else if (localStorage.getItem("type") == "company") {
        if (this.visitedId != this.id) {
          this.companyActionVisibilityStyle = "hidden";
          this.setAllNeededData(this.visitedId);
        } else {
          this.setAllNeededData(this.visitedId);
          this.sameCompany = true;
          this.companyActionVisibilityStyle = "visible";
        }
      }
    } else {
      this.sameCompany = true;
      this.setAllNeededData(this.id);
    }
  }

  public fetchCompanyJobs(companyId: number) {
    this.companyService.fetchCompanyJobs(companyId).subscribe(
      (jobs) => {
        jobs.forEach(value => {
          value.requirement = value.requirement.replace(/(\r\n|\r|\n)/g, '<br>');
          value.description = value.description.replace(/(\r\n|\r|\n)/g, '<br>');
        });
        this.jobs = jobs;
      }
    )
  }

  private setUpAllCompanyData(id: number) {
    this.companyService.getCompanyById(id).subscribe(
      (company) => {
        company.about = company.about.replace(/(\r\n|\r|\n)/g, '<br>');
        this.company = company;
      }
    )
  }

  private setAllNeededData(id: number) {
    this.fetchCompanyJobs(id);
    this.setUpAllCompanyData(id);
  }

  public deleteJob() {
    this.jobService.deleteJob(this.selectedDeleteJobId).subscribe(
      (response) => {
        if (response) {
          this.fetchCompanyJobs(this.id);
          this.closeDeleteDialog();
          console.log("Job post deleted successfully");
        } else {
          this.closeDeleteDialog();
          console.log("Failed to delete job post");
        }
      }
    )
  }

  closeDeleteDialog() {
    this.deleteDisplayStyle = "none";
  }

  showDeleteDialog(jobId: number) {
    this.deleteDisplayStyle = "block";
    this.selectedDeleteJobId = jobId;
  }

  showJobApplicants(jobId: number) {
    this.jobService.fetchJobApplicants(jobId).subscribe(
      (applicants) => {
        this.applicants = applicants;
        this.applicantsDisplayStyle = "block";
      }
    )
  }

  closeApplicantsDialog() {
    this.applicantsDisplayStyle = "none";
  }

  directToUser(userId: number) {
    this.router.navigateByUrl("/user-profile/" + userId).then(() => console.log("Directed to user with id : " + userId));
  }

  applyForJob(jobId: number) {
    this.jobService.applyJob(Number(localStorage.getItem("id")), jobId).subscribe(
      (response) => {
        if (response) {
          console.log("Applied for job successfully")
          this.userAppliedJobsIds.push(jobId);
        }
      }
    )
  }
}
