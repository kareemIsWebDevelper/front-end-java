import {Component, OnInit} from '@angular/core';
import {Course} from "../../model/Course";
import {Education} from "../../model/Education";
import {Experience} from "../../model/Experience";
import {Project} from "../../model/Project";
import {Skill} from "../../model/Skill";
import {CourseService} from "../../service/course.service";
import {EducationService} from "../../service/education.service";
import {ExperienceService} from "../../service/experience.service";
import {ProjectService} from "../../service/project.service";
import {SkillService} from "../../service/skill.service";
import {User} from "../../model/User";
import {UserService} from "../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "../../service/message.service";
import {Message} from "../../model/Message";
import {MessageSaveDTO} from "../../dto/MessageSaveDTO";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public courses: Course[] = [];
  public education: Education[] = [];
  public experience: Experience[] = [];
  public projects: Project[] = [];
  public skills: Skill[] = [];

  public chat: Message[] = [];
  public messageSaveDTO: MessageSaveDTO = new MessageSaveDTO();

  public user: User = new User();

  public id: number = Number(localStorage.getItem("id"));

  public deleteDisplayStyle = "none";
  public userActionDisplayStyle = "block";
  public alreadyFollowingDisplayStyle = false;
  public companyViewer = false;
  public sameUser = false;
  public visitedId = -1;
  chatDisplayStyle = "none";


  constructor(private userService: UserService,
              private courseService: CourseService,
              private educationService: EducationService,
              private experienceService: ExperienceService,
              private projectService: ProjectService,
              private skillService: SkillService,
              private messageService: MessageService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const idIsPresent = this.activatedRoute.snapshot.paramMap.has('id');
    if (idIsPresent) {
      const visitedId = this.activatedRoute.snapshot.paramMap.get('id');
      this.visitedId = visitedId as unknown as number;
      if (localStorage.getItem("type") == "company") {
        this.userActionDisplayStyle = "none";
        this.companyViewer = true;
      } else if (localStorage.getItem("type") == "user") {
        if (visitedId as unknown as number != this.id) {
          this.userActionDisplayStyle = "none";
          this.userService.isUserFollow(this.id, visitedId as unknown as number).subscribe(
            (response) => {
              this.alreadyFollowingDisplayStyle = response;
            }
          );
        } else {
          this.sameUser = true;
        }
      }
      this.setUpAllUserData(visitedId as unknown as number);

    } else {
      this.sameUser = true;
      this.setUpAllUserData(this.id);
    }
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('/login').then(() => console.log("Logged out successfully"));
  }

  deleteAccount() {
    this.userService.deleteUserById(this.id).subscribe(
      (response) => {
        if (response) {
          console.log(response + " : Deleted successfully");
          this.logout();
        } else {
          console.log(response + " : Deletion failed");
        }
      }
    );
  }

  deleteEducation(educationId: number) {
    this.educationService.deleteEducationById(educationId).subscribe(
      (response) => {
        if (response) {
          console.log(response + " : Deleted successfully");
          this.fetchEducationForUser(this.id);
        } else {
          console.log(response + " : Deletion failed");
        }
      }
    );
  }

  deleteSkill(skillId: number) {
    this.skillService.deleteSkillById(skillId).subscribe(
      (response) => {
        if (response) {
          console.log(response + " : Deleted successfully");
          this.fetchSkillsForUser(this.id);
        } else {
          console.log(response + " : Deletion failed");
        }
      }
    );
  }

  deleteCourse(courseId: number) {
    this.courseService.deleteCourseById(courseId).subscribe(
      (response) => {
        if (response) {
          console.log(response + " : Deleted successfully");
          this.fetchCoursesForUser(this.id);
        } else {
          console.log(response + " : Deletion failed");
        }
      }
    );
  }

  deleteProject(projectId: number) {
    this.projectService.deleteProjectById(projectId).subscribe(
      (response) => {
        if (response) {
          console.log(response + " : Deleted successfully");
          this.fetchProjectsForUser(this.id);
        } else {
          console.log(response + " : Deletion failed");
        }
      }
    );
  }

  deleteExperience(experienceId: number) {
    this.experienceService.deleteExperienceById(experienceId).subscribe(
      (response) => {
        if (response) {
          console.log(response + " : Deleted successfully");
          this.fetchExperienceForUser(this.id);
        } else {
          console.log(response + " : Deletion failed");
        }
      }
    );
  }

  private fetchSkillsForUser(id: number) {
    this.skillService.getAllSkillsForUser(id).subscribe(
      (data) => {
        this.skills = data;
      }
    )
  }

  private fetchCoursesForUser(id: number) {
    this.courseService.getAllCoursesForUser(id).subscribe(
      (data) => {
        this.courses = data;
      }
    )
  }

  private fetchProjectsForUser(id: number) {
    this.projectService.getAllProjectsForUser(id).subscribe(
      (data) => {
        data.forEach(value => value.projectDescription = value.projectDescription.replace(/(\r\n|\r|\n)/g, '<br>'));
        this.projects = data
      }
    )
  }

  private fetchExperienceForUser(id: number) {
    this.experienceService.getAllExperienceForUser(id).subscribe(
      (data) => {
        this.experience = data;
      }
    )
  }

  private fetchEducationForUser(id: number) {
    this.educationService.getAllEducationForUser(id).subscribe(
      (data) => {
        this.education = data;
      }
    )
  }

  private fetchUser(id: number) {
    this.userService.getUserById(id).subscribe(
      (data) => {
        data.about = data.about?.replace(/(\r\n|\r|\n)/g, '<br>');
        this.user = data;
      }
    )
  }

  private setUpAllUserData(id: number) {
    this.fetchUser(id);
    this.fetchExperienceForUser(id);
    this.fetchProjectsForUser(id);
    this.fetchCoursesForUser(id);
    this.fetchSkillsForUser(id);
    this.fetchEducationForUser(id);
  }

  closeDeleteDialog() {
    this.deleteDisplayStyle = "none";
  }

  showDeleteDialog() {
    this.deleteDisplayStyle = "block";
  }

  followUser() {
    this.userService.userFollow(this.id, this.visitedId).subscribe(
      (response) => {
        if (response) {
          console.log("User with id " + this.id + " is now following user with id " + this.visitedId);
          this.alreadyFollowingDisplayStyle = true;
        } else {
          console.log("User with id " + this.id + " failed to follow user with id " + this.visitedId);
        }
      }
    )
  }

  unfollowUser() {
    this.userService.userUnfollow(this.id, this.visitedId).subscribe(
      (response) => {
        if (response) {
          console.log("User with id " + this.id + " is now unfollowed user with id " + this.visitedId);
          this.alreadyFollowingDisplayStyle = false;
        } else {
          console.log("User with id " + this.id + " failed to unfollow user with id " + this.visitedId);
        }
      }
    )
  }

  closeChatDialog() {
    this.chatDisplayStyle = "none";
  }

  openChatDialog() {
    if (this.chat.length == 0) {
      this.fetchChat();
    }
    this.chatDisplayStyle = "block";
  }

  sendMessage() {
    this.messageSaveDTO.senderId = this.id;
    this.messageSaveDTO.receiverId = this.visitedId;
    this.messageSaveDTO.date = new Date();
    this.messageService.saveMessage(this.messageSaveDTO).subscribe(
      (response) => {
        if (response) {
          this.fetchChat();
          this.messageSaveDTO=new MessageSaveDTO();
        }
      }
    )
  }

  public fetchChat() {
    this.messageService.getChat(this.id, this.visitedId).subscribe(
      (chat) => {
        this.chat = chat;
        console.log(chat);
      }
    );
  }
}
