import { SubPlace } from "./subPlace.model";

export class Place {
  constructor(
    public name: string = "",
    public description: string = "",
    public bookSubPlaceList: SubPlace[] = [],
    public creationDate: Date = new Date(),
    public lastChangeDate: Date = new Date(),
    public id: number = -1,
  ) {

  }
  public subplacesToString(): string {
    let resultString: string = "";
    for(let bookSubPlace of this.bookSubPlaceList) {
      resultString = resultString + " " + bookSubPlace.name;
    }
    return resultString;
  }
}
