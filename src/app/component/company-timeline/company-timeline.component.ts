import {Component, OnInit} from '@angular/core';
import {Company} from "../../model/Company";
import {CompanyService} from "../../service/company.service";
import {ActivatedRoute} from "@angular/router";
import {CompanyPost} from "../../model/CompanyPost";
import {CompanyPostDTO} from "../../dto/CompanyPostDTO";
import {CompanyPostService} from "../../service/company-post.service";
import {TimelinePackage} from "../../dto/TimelinePackage";

@Component({
  selector: 'app-company-timeline',
  templateUrl: './company-timeline.component.html',
  styleUrls: ['./company-timeline.component.css']
})
export class CompanyTimelineComponent implements OnInit {
  public id = Number(localStorage.getItem("id"));
  public company: Company = new Company();
  public companyActionVisibilityStyle = "visible";
  public visitedId = -1;
  public userViewer = false;
  public sameCompany = false;
  timelineCheckedValue = 1;
  postsCheckedValue = 0;

  public companyPosts: CompanyPost[] = [];
  public timeline: TimelinePackage = new TimelinePackage();
  public companyPostsDisplayStyle = "none";
  public timelineDisplayStyle = "block";
  public postingDisplayStyle = "none";
  public companyPostDTO: CompanyPostDTO = new CompanyPostDTO();

  constructor(private companyService: CompanyService, private companyPostService: CompanyPostService, private activatedRoute: ActivatedRoute) {
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

  private setAllNeededData(id: number) {
    this.fetchCompanyTimeline(id);
    this.setUpAllCompanyData(id);
  }

  private setUpAllCompanyData(id: number) {
    this.companyService.getCompanyById(id).subscribe(
      (company) => {
        company.about = company.about.replace(/(\r\n|\r|\n)/g, '<br>');
        this.company = company;
      }
    )
  }

  private fetchCompanyTimeline(id: number) {
    this.companyService.getCompanyTimeline(id).subscribe(
      (timeline) => {
        timeline.userPosts.forEach(post => {
          post.text = post.text.replace(/(\r\n|\r|\n)/g, '<br>');
        })
        timeline.companyPosts.forEach(post => {
          post.text = post.text.replace(/(\r\n|\r|\n)/g, '<br>');
        })
        this.timeline = timeline;
      }
    )
  }

  private fetchCompanyPosts() {
    this.companyService.getCompanyPosts(this.id).subscribe(
      (posts) => {
        posts.forEach(post => {
          post.text = post.text.replace(/(\r\n|\r|\n)/g, '<br>');
        })
        this.companyPosts = posts;
      }
    )
  }

  timelineChecked() {
    this.postsCheckedValue = 0;
    this.timelineCheckedValue = 1;
    this.companyPostsDisplayStyle = "none";
    this.timelineDisplayStyle = "block";
    this.fetchCompanyTimeline(this.id);
  }

  postsChecked() {
    this.timelineCheckedValue = 0;
    this.postsCheckedValue = 1;
    this.companyPostsDisplayStyle = "block";
    this.timelineDisplayStyle = "none";
    if (this.companyPosts.length == 0) {
      this.fetchCompanyPosts();
    }
  }

  closePostingDialog() {
    this.postingDisplayStyle = "none";
  }

  savePost() {
    this.companyPostDTO.companyId = this.id;
    this.companyPostDTO.date = Date.now().toString();
    this.companyPostService.savePost(this.companyPostDTO).subscribe(
      (response) => {
        if (response) {
          this.fetchCompanyPosts();
          this.closePostingDialog();
          this.companyPostDTO = new CompanyPostDTO();
        }
      }
    );
  }

  showPostingDialog() {
    this.postingDisplayStyle = "block";
  }

  deletePost(postId: number) {
    this.companyPostService.deletePost(postId).subscribe(
      (response) => {
        if (response) {
          this.fetchCompanyPosts();
        }
      }
    )
  }
}
