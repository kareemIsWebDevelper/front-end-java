import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from "./component/login/login.component";
import {RouterModule, Routes} from "@angular/router";
import {UserProfileComponent} from "./component/user-profile/user-profile.component";
import {CompanyProfileComponent} from "./component/company-profile/company-profile.component";
import {CompanyJobsComponent} from "./component/company-jobs/company-jobs.component";
import {UserRegistrationComponent} from "./component/user-registration/user-registration.component";
import {CompanyRegistrationComponent} from "./component/company-registration/company-registration.component";
import {PageNotFoundComponent} from "./component/page-not-found/page-not-found.component";
import {EducationSubmissionComponent} from "./component/education-submission/education-submission.component";
import {ExperienceSubmissionComponent} from "./component/experience-submission/experience-submission.component";
import {ProjectSubmissionComponent} from "./component/project-submission/project-submission.component";
import {CourseSubmissionComponent} from "./component/course-submission/course-submission.component";
import {SkillSubmissionComponent} from "./component/skill-submission/skill-submission.component";
import {AboutSubmissionComponent} from "./component/about-submission/about-submission.component";
import {JobSubmissionComponent} from "./component/job-submission/job-submission.component";
import {UserJobsComponent} from "./component/user-jobs/user-jobs.component";
import {UserTimelineComponent} from "./component/user-timeline/user-timeline.component";
import {CompanyTimelineComponent} from "./component/company-timeline/company-timeline.component";


const routes: Routes = [
  {
   path:'',
   redirectTo:'/login',
    pathMatch:'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'user-profile',
    component:UserProfileComponent
  },
  {
    path:'user-profile/:id',
    component:UserProfileComponent
  },
  {
    path:'company-profile',
    component:CompanyProfileComponent
  },
  {
    path:'company-profile/:id',
    component:CompanyProfileComponent
  },
  {
    path:'company-jobs',
    component:CompanyJobsComponent
  },
  {
    path:'company-jobs/:id',
    component:CompanyJobsComponent
  },
  {
    path:'user-registration',
    component:UserRegistrationComponent
  },
  {
    path:'user-registration/:id',
    component:UserRegistrationComponent
  }
  ,{
    path:'company-registration',
    component:CompanyRegistrationComponent
  },
  {
    path:'company-registration/:id',
    component:CompanyRegistrationComponent
  },
  {
    path:'education-submission',
    component:EducationSubmissionComponent
  },
  {
    path:'education-submission/:id',
    component:EducationSubmissionComponent
  },
  {
    path:'experience-submission',
    component:ExperienceSubmissionComponent
  },
  {
    path:'experience-submission/:id',
    component:ExperienceSubmissionComponent
  },
  {
    path:'project-submission',
    component:ProjectSubmissionComponent
  },
  {
    path:'project-submission/:id',
    component:ProjectSubmissionComponent
  },
  {
    path:'course-submission',
    component:CourseSubmissionComponent
  },
  {
    path:'course-submission/:id',
    component:CourseSubmissionComponent
  },
  {
    path:'skill-submission',
    component:SkillSubmissionComponent
  },
  {
    path:'about-submission',
    component:AboutSubmissionComponent
  },
  {
    path:'job-submission',
    component:JobSubmissionComponent
  },
  {
    path:'user-jobs',
    component:UserJobsComponent
  },
  {
    path:'user-timeline/:id',
    component:UserTimelineComponent
  },
  {
    path:'user-timeline',
    component:UserTimelineComponent
  },
  {
    path:'company-timeline',
    component:CompanyTimelineComponent
  },
  {
    path:'company-timeline/:id',
    component:CompanyTimelineComponent
  },
  {
    path:'**',
    component:PageNotFoundComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {
}
