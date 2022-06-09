import { BookPicture } from "./bookPicture.model";
import { Place } from "./place.model";
import { SubPlace } from "./subPlace.model";
import { SubType } from "./subType.model";
import { Type } from "./type.model";
import { CommonPrototype } from "./common-prototype.interface";
import { ItemPrototype } from "./itemPrototype.interface";

export class Book implements CommonPrototype, ItemPrototype {
  constructor(
    public name: string = '',
    public author: string = '',
    public publishYear: number = -1,
    public publisher: string = '',
    public seria: string = '',
    public weight: string = '',
    public size: string = '',
    public description: string = '',
    public key: string = '',
    public bookType: Type = new Type(),
    public bookSubType: SubType = new SubType(),
    public bookPlace: Place = new Place(),
    public bookSubPlace: SubPlace = new SubPlace(),
    public bookPictureList: BookPicture[] = [],
    public creationDate: Date = new Date(),
    public lastChangeDate: Date = new Date(),
    public id: number = -1,
  ) {

  }
}
