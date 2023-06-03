import {Component} from '@angular/core';
import {LoginDTO} from "../../dto/LoginDTO";
import {UserService} from "../../service/user.service";
import {CompanyService} from "../../service/company.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  public invalidCredentials: boolean = false;
  public selectedAccountType: number = 1;


  public loginDTO: LoginDTO = new LoginDTO();


  constructor(private userService: UserService, private companyService: CompanyService,private router:Router) {
  }

  login() {
    if (this.selectedAccountType == 1) {
      this.userService.userLogin(this.loginDTO).subscribe(
        (data) => {
          this.invalidCredentials = data == -1;
          if (data != -1) {
            // direct to user profile and fetching data there
            localStorage.setItem("id",String(data));
            localStorage.setItem("type","user");
            this.router.navigateByUrl('/user-timeline/'+data).then(() => console.log("Directed to user profile"));
          }
        }
      );
    } else {
      this.companyService.companyLogin(this.loginDTO).subscribe(
        (data) => {
          this.invalidCredentials = data == -1;
          if (data != -1) {
            // direct to company profile and fetching data there
            localStorage.setItem("id",String(data));
            localStorage.setItem("type","company");
            this.router.navigateByUrl('/company-timeline/'+data).then(() => console.log("Directed to company profile"));
          }
        }
      );
    }
  }

  register() {
    if(this.selectedAccountType==1){
      this.router.navigateByUrl('/user-registration').then(() => console.log("Directed to registration page"));
    }else{
      this.router.navigateByUrl('/company-registration').then(() => console.log("Directed to registration page"));
    }
  }
}
