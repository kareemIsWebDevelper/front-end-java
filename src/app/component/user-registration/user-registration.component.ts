import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {UserSaveDTO} from "../../dto/UserSaveDTO";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../model/User";

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  public userSaveDTO: UserSaveDTO = new UserSaveDTO();
  public confirmPassword: string;
  invalidCredentials: boolean = false;

  public userId: number = -1;

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const idIsPresent = this.activatedRoute.snapshot.paramMap.has('id');
    if (idIsPresent) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.userId = Number(id);
      this.userService.getUserById(id as unknown as number).subscribe(
        (data) => {
          this.setUserDataToUserSaveDTO(data);
        }
      )
    }
  }

  saveOrUpdateUser() {
    if (this.userSaveDTO.password != this.confirmPassword) {
      this.invalidCredentials = true;
    } else {
      if (this.userId != -1) {
        this.userService.updateUser(this.userId, this.userSaveDTO).subscribe(
          (response) => {
            if (!response) {
              this.invalidCredentials = true;
            } else {
              this.logout();
            }
          }
        )
      } else {
        this.userService.saveUser(this.userSaveDTO).subscribe(
          (response) => {
            if (!response) {
              this.invalidCredentials = true;
            } else {
              this.router.navigateByUrl('/login').then(() => console.log("User registered successfully"));
            }
          }
        );
      }
    }
  }

  private setUserDataToUserSaveDTO(user: User) {
    this.userSaveDTO.about = user.about;
    this.userSaveDTO.city = user.city;
    this.userSaveDTO.country = user.country;
    this.userSaveDTO.email = user.email;
    this.userSaveDTO.birthDate = user.birthDate;
    this.userSaveDTO.firstName = user.firstName;
    this.userSaveDTO.jobTitle = user.jobTitle;
    this.userSaveDTO.lastName = user.lastName;
    this.userSaveDTO.phone = user.phone;
    this.userSaveDTO.profilePicturePath = user.profilePicturePath;
  }

  private logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('/login').then(() => console.log("User data updated successfully"));
  }


  delete() {
    this.userSaveDTO.profilePicturePath = null;
  }



  // Web server for chrome must listen to specific folder contains all profile pictures
  onSelectFile($event: Event) {
    // @ts-ignore
    this.userSaveDTO.profilePicturePath = "http://127.0.0.1:8887/" + event.target.files[0].name;
    console.log(this.userSaveDTO.profilePicturePath);
    // @ts-ignore
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      // @ts-ignore
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed

      }
    }
  }
}
