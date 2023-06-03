import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {JobService} from "../../service/job.service";
import {User} from "../../model/User";
import {UserJobsPackage} from "../../dto/UserJobsPackage";

@Component({
  selector: 'app-user-jobs',
  templateUrl: './user-jobs.component.html',
  styleUrls: ['./user-jobs.component.css']
})
export class UserJobsComponent implements OnInit {

  public user: User = new User();
  public userJobsPackage: UserJobsPackage = new UserJobsPackage();
  public userAppliedJobsIds: number[] = [];

  constructor(private userService: UserService, private jobService: JobService) {
  }

  ngOnInit(): void {
    this.setUpUserData();
    this.fetchAllJobsForUser();
    this.fetchAllUserAppliedJobIds();
  }

  private setUpUserData() {
    if (localStorage.getItem("type") == "user") {
      this.userService.getUserById(Number(localStorage.getItem("id"))).subscribe(
        (user) => {
          this.user = user;
        }
      )
    }
  }

  private fetchAllJobsForUser() {
    if (localStorage.getItem("type") == "user") {
      this.jobService.fetchAllJobsForUser(Number(localStorage.getItem("id"))).subscribe(
        (jobs) => {
          jobs.matching.forEach(value => {
            value.requirement = value.requirement.replace(/(\r\n|\r|\n)/g, '<br>');
            value.description = value.description.replace(/(\r\n|\r|\n)/g, '<br>');
          });
          jobs.others.forEach(value => {
            value.requirement = value.requirement.replace(/(\r\n|\r|\n)/g, '<br>');
            value.description = value.description.replace(/(\r\n|\r|\n)/g, '<br>');
          });
          this.userJobsPackage = jobs;
        }
      )
    }
  }

  applyForJob(jobId: number) {
    this.jobService.applyJob(Number(localStorage.getItem("id")), jobId).subscribe(
      (response) => {
        if (response) {
          this.userAppliedJobsIds.push(jobId);
          console.log("Applied for job successfully");
        } else {
          console.log("Failed to apply for job");
        }
      }
    )
  }


  private fetchAllUserAppliedJobIds() {
    this.userService.getUserAppliedJobsIds(Number(localStorage.getItem("id"))).subscribe(
      (userAppliedJobIds) => {
        this.userAppliedJobsIds = userAppliedJobIds;
      }
    )
  }
}
