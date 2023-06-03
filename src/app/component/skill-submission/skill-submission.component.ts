import {Component, OnInit} from '@angular/core';
import {SkillDTO} from "../../dto/SkillDTO";
import {SkillService} from "../../service/skill.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-skill-submission',
  templateUrl: './skill-submission.component.html',
  styleUrls: ['./skill-submission.component.css']
})
export class SkillSubmissionComponent implements OnInit {
  public skillDTO: SkillDTO = new SkillDTO();

  constructor(private skillService: SkillService, private router: Router) {
  }

  ngOnInit(): void {
  }

  saveSkill() {
    this.skillDTO.userId = Number(localStorage.getItem("id"));
    this.skillService.saveSkill(this.skillDTO).subscribe(
      () => {
        this.router.navigateByUrl('/user-profile').then(value => console.log("Skill saved successfully"))
      }
    )
  }
}
