import { User } from "./user";

export interface Task {
  id:number,
  user:User,
  name:string,
  description:string,
  inputDate:Date,
  term:Date
}
