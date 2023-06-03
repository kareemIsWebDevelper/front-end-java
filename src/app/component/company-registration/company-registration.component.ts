import {Component, OnInit} from '@angular/core';
import {CompanySaveDTO} from "../../dto/CompanySaveDTO";
import {CompanyService} from "../../service/company.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Company} from "../../model/Company";

@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.css']
})
export class CompanyRegistrationComponent implements OnInit {

  public companySaveDTO: CompanySaveDTO = new CompanySaveDTO();
  public company: Company = new Company();
  public confirmPassword: string;
  invalidCredentials: boolean = false;

  public companyId: number = -1;

  constructor(private companyService: CompanyService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const idIsPresent = this.activatedRoute.snapshot.paramMap.has('id');
    if (idIsPresent) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.companyId = Number(id);
      this.companyService.getCompanyById(id as unknown as number).subscribe(
        (data) => {
          this.setCompanyDataToCompanySaveDTO(data);
        }
      )
    }
  }

  saveOrUpdateCompany() {
    if (this.companySaveDTO.password != this.confirmPassword) {
      this.invalidCredentials = true;
    } else {
      if (this.companyId != -1) {
        this.companyService.updateCompany(this.companyId, this.companySaveDTO).subscribe(
          (response) => {
            if (!response) {
              this.invalidCredentials = true;
            } else {
              this.logout();
            }
          }
        )
      } else {
        this.companyService.saveCompany(this.companySaveDTO).subscribe(
          (response) => {
            if (!response) {
              this.invalidCredentials = true;
            } else {
              this.router.navigateByUrl('/login').then(() => console.log("Company registered successfully"));
            }
          }
        );
      }
    }
  }

  private setCompanyDataToCompanySaveDTO(company: Company) {
    this.companySaveDTO.about = company.about;
    this.companySaveDTO.bio = company.bio;
    this.companySaveDTO.foundedDate = company.foundedDate;
    this.companySaveDTO.website = company.website;
    this.companySaveDTO.name = company.name;
    this.companySaveDTO.industry = company.industry;
    this.companySaveDTO.city = company.city;
    this.companySaveDTO.country = company.country;
    this.companySaveDTO.email = company.email;
    this.companySaveDTO.phone = company.phone;
  }

  private logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('/login').then(() => console.log("Company data updated successfully"));
  }
}
