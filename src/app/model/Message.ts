import {User} from "./User";

export class Message {
  id: number;
  body:string;
  sender: User = new User();
  receiver: User = new User();
  date: Date;
}
