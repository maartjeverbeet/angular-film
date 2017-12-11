export class Voorstelling {
  public name: string;
  public time: string;
  public _id: string;
  public zaal: number;

  constructor(name: string, time: string, zaal: number) {
    this.name = name;
    this.time = time;
    this.zaal = zaal;
  }
}
