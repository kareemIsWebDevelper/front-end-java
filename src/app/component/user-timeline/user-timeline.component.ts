import {Component, OnInit} from '@angular/core';
import {CompanyPost} from "../../model/CompanyPost";
import {TimelinePackage} from "../../dto/TimelinePackage";
import {UserPostDTO} from "../../dto/UserPostDTO";

import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../service/user.service";
import {UserPostService} from "../../service/user-post.service";
import {User} from "../../model/User";

@Component({
  selector: 'app-user-timeline',
  templateUrl: './user-timeline.component.html',
  styleUrls: ['./user-timeline.component.css']
})
export class UserTimelineComponent implements OnInit {

  public id = Number(localStorage.getItem("id"));
  public companyViewer = false;
  public sameUser = false;
  timelineCheckedValue = 1;
  postsCheckedValue = 0;
  public timelineDisplayStyle = "block";
  public postingDisplayStyle = "none";

  public userPosts: CompanyPost[] = [];
  public timeline: TimelinePackage = new TimelinePackage();
  public userPostsDisplayStyle = "none";

  public user: User = new User();
  public userPostDTO: UserPostDTO = new UserPostDTO();
  private visitedId: number;
  public userActionVisibilityStyle = "visible";

  constructor(private userService: UserService, private userPostService: UserPostService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const idIsPresent = this.activatedRoute.snapshot.paramMap.has('id');
    if (idIsPresent) {
      const visitedId = this.activatedRoute.snapshot.paramMap.get('id');
      this.visitedId = visitedId as unknown as number;
      if (localStorage.getItem("type") == "company") {
        this.setAllNeededData(this.visitedId);
        this.userActionVisibilityStyle = "hidden";
        this.companyViewer = true;
      } else if (localStorage.getItem("type") == "user") {
        if (this.visitedId != this.id) {
          this.userActionVisibilityStyle = "hidden";
          this.setAllNeededData(this.visitedId);
        } else {
          this.setAllNeededData(this.visitedId);
          this.sameUser = true;
          this.userActionVisibilityStyle = "visible";
        }
      }
    } else {
      this.sameUser = true;
      this.setAllNeededData(this.id);
    }
  }

  private setAllNeededData(id: number) {
    this.fetchUserTimeline(id);
    this.setUpAllUserData(id);
  }

  private setUpAllUserData(id: number) {
    this.userService.getUserById(id).subscribe(
      (user) => {
        user.about = user.about?.replace(/(\r\n|\r|\n)/g, '<br>');
        this.user = user;
      }
    )
  }

  private fetchUserTimeline(id: number) {
    console.log("fetching timeline");
    this.userService.getUserTimeline(id).subscribe(
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

  private fetchUserPosts() {
    console.log("fetching user posts");
    this.userService.getUserPosts(this.id).subscribe(
      (posts) => {
        posts.forEach(post => {
          post.text = post.text.replace(/(\r\n|\r|\n)/g, '<br>');
        })
        this.userPosts = posts;
      }
    )
  }

  timelineChecked() {
    this.postsCheckedValue = 0;
    this.timelineCheckedValue = 1;
    this.userPostsDisplayStyle = "none";
    this.timelineDisplayStyle = "block";
    this.fetchUserTimeline(this.id);
  }

  postsChecked() {
    this.timelineCheckedValue = 0;
    this.postsCheckedValue = 1;
    this.userPostsDisplayStyle = "block";
    this.timelineDisplayStyle = "none";
    if (this.userPosts.length == 0) {
      this.fetchUserPosts();
    }
  }

  savePost() {
    this.userPostDTO.userId = this.id;
    this.userPostDTO.date = Date.now().toString();
    this.userPostService.savePost(this.userPostDTO).subscribe(
      (response) => {
        if (response) {
          this.fetchUserPosts();
          this.closePostingDialog();
          this.userPostDTO = new UserPostDTO();
        }
      }
    );
  }

  closePostingDialog() {
    this.postingDisplayStyle = "none";
  }

  showPostingDialog() {
    this.postingDisplayStyle = "block";
  }

  deletePost(postId: number) {
    this.userPostService.deletePost(postId).subscribe(
      () => {
        this.fetchUserPosts();
      }
    )
  }
}
