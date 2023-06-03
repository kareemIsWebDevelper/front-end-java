import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './component/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterLink, RouterLinkWithHref, RouterOutlet} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { CompanyProfileComponent } from './component/company-profile/company-profile.component';
import { UserNavbarComponent } from './component/user-navbar/user-navbar.component';
import { CompanyNavbarComponent } from './component/company-navbar/company-navbar.component';
import { CompanyJobsComponent } from './component/company-jobs/company-jobs.component';
import { UserRegistrationComponent } from './component/user-registration/user-registration.component';
import { CompanyRegistrationComponent } from './component/company-registration/company-registration.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { EducationSubmissionComponent } from './component/education-submission/education-submission.component';
import { ExperienceSubmissionComponent } from './component/experience-submission/experience-submission.component';
import { ProjectSubmissionComponent } from './component/project-submission/project-submission.component';
import { CourseSubmissionComponent } from './component/course-submission/course-submission.component';
import { SkillSubmissionComponent } from './component/skill-submission/skill-submission.component';
import { AboutSubmissionComponent } from './component/about-submission/about-submission.component';
import { JobSubmissionComponent } from './component/job-submission/job-submission.component';
import { UserJobsComponent } from './component/user-jobs/user-jobs.component';
import { UserTimelineComponent } from './component/user-timeline/user-timeline.component';
import { CompanyTimelineComponent } from './component/company-timeline/company-timeline.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserProfileComponent,
    CompanyProfileComponent,
    UserNavbarComponent,
    CompanyNavbarComponent,
    CompanyJobsComponent,
    UserRegistrationComponent,
    CompanyRegistrationComponent,
    PageNotFoundComponent,
    EducationSubmissionComponent,
    ExperienceSubmissionComponent,
    ProjectSubmissionComponent,
    CourseSubmissionComponent,
    SkillSubmissionComponent,
    AboutSubmissionComponent,
    JobSubmissionComponent,
    UserJobsComponent,
    UserTimelineComponent,
    CompanyTimelineComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        RouterOutlet,
        FormsModule,
        RouterLinkWithHref,
        RouterLink
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
