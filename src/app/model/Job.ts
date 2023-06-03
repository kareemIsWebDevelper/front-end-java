import {User} from "./User";

export class Job{
  id:number
  title:string
  location:string
  employmentType:string
  description:string
  requirement:string
  date:string
  applicants:User[]=[]
}
