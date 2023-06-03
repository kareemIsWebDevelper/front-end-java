import {Component, Input} from '@angular/core';
import {User} from "../../model/User";
import {UserService} from "../../service/user.service";
import {CompanyService} from "../../service/company.service";
import {Company} from "../../model/Company";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent{

  @Input() userFirstName: string;
  @Input() userId: number;
  @Input() sameUser: boolean;

  public users: User[] = [];
  public companies: Company[] = [];
  public searchKey: string = "";
  public searchOrFollowingResultDisplayStyle: string = "none";
  public followersDisplayStyle = "none";

  constructor(private userService: UserService, private companyService: CompanyService, private router: Router) {
  }

  showSearchResult() {
    if (this.searchKey != "") {
      this.userService.getAllUsersByName(this.searchKey).subscribe(
        (users) => {
          this.users = users;
        }
      )
      this.companyService.getAllCompaniesByName(this.searchKey).subscribe(
        (companies) => {
          this.companies = companies;
        }
      )
      this.searchOrFollowingResultDisplayStyle = "block";
    }
  }

  closeSearchOrFollowingDialog() {
    this.searchOrFollowingResultDisplayStyle = "none";
  }

  directToUser(userId: number) {
    this.closeSearchOrFollowingDialog()
    this.closeFollowersDialog();
    this.router.navigateByUrl('/user-profile/' + userId).then(() => {
      console.log("Directed to user with id : " + userId);
      window.location.reload();
    });
  }


  closeFollowersDialog() {
    this.followersDisplayStyle = "none";
  }

  showUserFollowers() {
    this.userService.fetchUserFollowers(this.userId).subscribe(
      (users) => {
        this.users = users;
      }
    )
    this.followersDisplayStyle = "block";
  }

  backToHomeProfile() {
    if (localStorage.getItem("type") == "user") {
      this.router.navigateByUrl('/user-timeline').then(() => console.log("Returned to profile"));
    } else {
      this.router.navigateByUrl('/company-timeline').then(() => console.log("Returned to profile"));
    }
  }

  showUserFollowingList() {
    this.userService.getFollowingUsers(this.userId).subscribe(
      (users) => {
        this.users = users;
      }
    );
    this.userService.getFollowingCompanies(this.userId).subscribe(
      (companies) => {
        this.companies = companies;
      }
    );
    this.searchOrFollowingResultDisplayStyle = "block";
  }
}
