/**
 * Created by maartje on 4-12-2017.
 */
export class Film {
  private id: string;
  private _name: string;
  private _description: string;
  private _imagePath: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  public get _id(): string {
    return this.id;
  }

  public set _id(n: string) {
    this.id = n;
  }

  public get name(): string {
    return this._name;
  }

  public set name (n: string) {
    this._name = n;
  }

  public get description(): string {
    return this._description;
  }

  public set description (d: string) {
    this._description = d;
  }

  public get imagePath(): string {
    return this._imagePath;
  }

  public set imagePath(i: string) {
    this._imagePath = i;
  }
}
