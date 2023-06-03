import {Component, Input, OnInit} from '@angular/core';
import {Company} from "../../model/Company";
import {Router} from "@angular/router";
import {CompanyService} from "../../service/company.service";
import {User} from "../../model/User";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-company-navbar',
  templateUrl: './company-navbar.component.html',
  styleUrls: ['./company-navbar.component.css']
})
export class CompanyNavbarComponent implements OnInit {

  @Input() companyData: Company;

  @Input() visibilityStyle: string;

  public displayStyle = "block";

  public deleteDisplayStyle = "none";

  public id: number = Number(localStorage.getItem("id"));

  public users: User[] = [];
  public companies: Company[] = [];
  public searchKey: string = "";
  public searchResultDisplayStyle: string = "none";
  public followersDisplayStyle = "none";


  constructor(private userService: UserService, private companyService: CompanyService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.visibilityStyle == "hidden") {
      this.displayStyle = "none";
    }
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('/login').then(() => console.log("Logged out successfully"));
  }

  closeDeleteDialog() {
    this.deleteDisplayStyle = "none"
  }

  deleteAccount() {
    this.companyService.deleteCompanyById(this.id).subscribe(
      (response) => {
        if (response) {
          this.logout();
          console.log("Account deleted successfully");
        } else {
          console.log("Deletion failed");
        }
      }
    )
  }

  showDeleteDialog() {
    this.deleteDisplayStyle = "block";
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
      this.searchResultDisplayStyle = "block";
    }
  }

  closeSearchDialog() {
    this.searchResultDisplayStyle = "none";
  }

  directToCompany(companyId: number) {
    this.closeSearchDialog();
    this.closeFollowersDialog();
    this.followersDisplayStyle = "none";
    this.router.navigateByUrl('/company-profile/' + companyId).then(() => {
        console.log("Directed to company with id : " + companyId);
        window.location.reload();
      }
    );
  }

  backToHomeProfile() {
    if (localStorage.getItem("type") == "user") {
      this.router.navigateByUrl('/user-timeline').then(() => console.log("Returned to profile"));
    } else {
      this.router.navigateByUrl('/company-timeline').then(() => console.log("Returned to profile"));
    }
  }

  closeFollowersDialog() {
    this.followersDisplayStyle = "none";
  }

  showCompanyFollowers() {
    console.log(this.companyData.id)
    this.companyService.fetchCompanyFollowers(this.companyData.id).subscribe(
      (users) => {
        this.users = users;
      }
    )
    this.followersDisplayStyle = "block";
  }
}
