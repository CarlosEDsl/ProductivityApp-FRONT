export interface Task {
  id?:number,
  user_id:number,
  name:string,
  description?:string,
  inputDate?:string,
  term:string
  finishDate?:string
}
