export class Module{
  constructor(
    public title: string,
    public description: string,
    public files: {name:string, url: string, type:string}[],
    public isOpen:boolean

  ){
    this.title = title;
    this.description = description;
    this.files = files;
    this.isOpen = isOpen;
  }



}
