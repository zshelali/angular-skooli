export interface Module {
  _id?: string;
  title: string,
  description: string,
  codeUe: string,
  files?: {name:string, url: string, type:string}[],
  isOpen:boolean,
  creationDate:Date
}
