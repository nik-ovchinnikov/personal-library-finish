import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/shared/models/book.model';
import { Place } from 'src/app/shared/models/place.model';
import { SubPlace } from 'src/app/shared/models/subPlace.model';
import { SubType } from 'src/app/shared/models/subType.model';
import { Type } from 'src/app/shared/models/type.model';
import { BookFilter } from 'src/app/shared/models/filters/bookFilter.model';
import { BookService } from '../../book.service';

@Component({
  selector: 'app-choose-item-delete',
  templateUrl: './choose-book-delete.component.html',
  styleUrls: ['./choose-book-delete.component.css']
})
export class ChooseBookDeleteComponent implements OnInit {

  showCarouselFlag: boolean = false;

  booksToShow: Book[] = [];
  booksToShowSubscription: Subscription = new Subscription();

  sourceList: string[] = [];

  //для фильтров
  filterData: BookFilter = new BookFilter();

  constructor(
    private bookService: BookService,
  ) { }

  ngOnInit(): void {
    this.booksToShowSubscription = this.bookService.bookListEmitter.subscribe((bookArray) => {
      this.booksToShow = bookArray;
      for(let book of this.booksToShow) {
        if(book.bookSubPlace == null) {
          book.bookSubPlace = new SubPlace();
        }
        if(book.bookSubType == null) {
          book.bookSubType = new SubType();
        }
        if(book.bookType == null) {
          book.bookType = new Type();
        }
        if(book.bookPlace == null) {
          book.bookPlace = new Place();
        }
      }
      console.log(this.booksToShow);
    });
    this.bookService.getAllBooks();
  }

  ngOnDestroy(): void {
      this.booksToShowSubscription.unsubscribe();
  }

  showCarousel(key: string) {
    this.showCarouselFlag = !this.showCarouselFlag;
    //дочтаём нужный элемент массива по ключу
    let currentBook = this.booksToShow.filter((book) => {
      return book.key == key;
    });
    this.sourceList = [];
    for(let bookPicture of currentBook[0].bookPictureList) {
      this.sourceList.push("./pictures/books/" + bookPicture.name);
    }
  }

  afterCloseCarousel() {
    this.showCarouselFlag = false
  }

  onFilterValueChanged(event: any) {
     this.filterData.byName = event.byName;
     this.filterData.byWordsInDescription= event.byWordsInDescription;
     this.filterData.key = event.byKey;
     this.filterData.fromCreationDate = event.fromCreationDate;
     this.filterData.fromLastChange = event.fromLastChange;
     this.filterData.sortType = event.sortType;
     this.filterData.tillCreationDate = event.tillCreationDate;
     this.filterData.tillLastChange= event.tillLastChange;
     this.filterData.type = event.typeName;
     this.filterData.place = event.placeName;
     this.filterData.subPlace = event.subPlaceName;
     this.filterData.subtype= event.subTypeName;
  }

  onDeleteBtnClick(event: any) {
    //TODO Тут можно воспоьзоваться ViewChild
    // let deleteItemIndex = event.target.previousSibling.previousSibling.innerHTML;
    let deleteItemKey = event.target.id;
    // console.log(deleteItemIndex);
    //находим index в массиве
    // let deleteItemIndex = this.booksToShow.findIndex((book) => {book.key == deleteItem.key});
    let deleteItemIndex = -2;
    this.booksToShow.forEach((item, index, array) => {
      if(item.key == deleteItemKey) {
        deleteItemIndex = index;
      }
    });
    //Добавить в массив для удаления
    this.bookService.booksToDelete.push(this.booksToShow[deleteItemIndex]);
    //Убрать из основного массива
    this.booksToShow.splice(deleteItemIndex, 1);
    // console.log(this.ps.placesToDelete);
  }
  cancelDeletes() {
    this.booksToShow = this.booksToShow.concat(this.bookService.booksToDelete);
    this.bookService.booksToDelete = [];
  }

  submitDelete(){
    console.log("Список bookToDelete ");
    console.log(this.bookService.booksToDelete);
    this.bookService.deleteBooks();
  }

}
