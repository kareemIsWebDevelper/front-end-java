import {Component, OnInit} from '@angular/core';
import {UserSaveDTO} from "../../dto/UserSaveDTO";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-about-submission',
  templateUrl: './about-submission.component.html',
  styleUrls: ['./about-submission.component.css']
})
export class AboutSubmissionComponent implements OnInit {

  public userSaveDTO: UserSaveDTO = new UserSaveDTO();

  public userId = Number(localStorage.getItem("id"));

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.userService.getUserById(this.userId).subscribe(
      (user) => {
        this.userSaveDTO.about = user.about;
      }
    )
  }

  saveAboutData() {
    this.userService.updateUserAbout(this.userId, this.userSaveDTO.about).subscribe(
      (response) => {
        if (response) {
          this.router.navigateByUrl('/user-profile').then(value => console.log("User about data updated successfully"));
        } else {
          console.log("Failed to update user about data");
        }
      }
    )
  }
}
