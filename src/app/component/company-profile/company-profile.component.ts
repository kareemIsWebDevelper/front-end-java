import {Component, OnInit} from '@angular/core';
import {CompanyService} from "../../service/company.service";
import {Company} from "../../model/Company";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  public company: Company = new Company();

  public id: number = Number(localStorage.getItem("id"));

  public companyActionVisibilityStyle = "visible";
  public userViewer = false;
  public sameCompany = false;
  public alreadyFollowing: boolean;
  public visitedId = -1;

  constructor(private companyService: CompanyService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const idIsPresent = this.activatedRoute.snapshot.paramMap.has('id');
    if (idIsPresent) {
      const visitedId = this.activatedRoute.snapshot.paramMap.get('id');
      this.visitedId = visitedId as unknown as number;
      if (localStorage.getItem("type") == "user") {
        this.companyActionVisibilityStyle = "hidden";
        this.userViewer = true;
        this.companyService.isCompanyFollow(this.id, this.visitedId).subscribe(
          (response) => {
            this.alreadyFollowing = response;
          }
        )
      } else if (localStorage.getItem("type") == "company") {
        if (visitedId as unknown as number != this.id) {
          this.companyActionVisibilityStyle = "hidden";
        } else {
          this.sameCompany = true;
        }
      }
      this.setUpAllCompanyData(visitedId as unknown as number);

    } else {
      this.sameCompany = true;
      this.setUpAllCompanyData(this.id);
    }
  }

  private setUpAllCompanyData(id: number) {
    this.companyService.getCompanyById(id).subscribe(
      (company) => {
        company.about = company.about.replace(/(\r\n|\r|\n)/g, '<br>');
        this.company = company;
      }
    )
  }

  followCompany() {
    this.companyService.companyFollow(this.id, this.visitedId).subscribe(
      (response) => {
        this.alreadyFollowing = response;
      }
    )
  }

  unfollowCompany() {
    this.companyService.companyUnfollow(this.id, this.visitedId).subscribe(
      (response) => {
        this.alreadyFollowing = !response;
      }
    )
  }
}
