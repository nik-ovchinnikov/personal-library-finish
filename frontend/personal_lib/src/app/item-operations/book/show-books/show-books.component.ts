import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/shared/models/book.model';
import { Place } from 'src/app/shared/models/place.model';
import { SubPlace } from 'src/app/shared/models/subPlace.model';
import { SubType } from 'src/app/shared/models/subType.model';
import { Type } from 'src/app/shared/models/type.model';
import { BookFilter } from 'src/app/shared/models/filters/bookFilter.model';
import { BookService } from '../book.service';
import { TypeService } from 'src/app/shared/components/type-operations/type.service';
import { PlaceService } from 'src/app/shared/components/place-operations/place.service';

@Component({
  selector: 'app-show-items',
  templateUrl: './show-books.component.html',
  styleUrls: ['./show-books.component.css']
})
export class ShowBooksComponent implements OnInit, OnDestroy {

  showCarouselFlag: boolean = false;

  booksToShow: Book[] = [];
  booksToShowSubscription: Subscription = new Subscription();

  sourceList: string[] = [];

  //для фильтров
  filterData: BookFilter = new BookFilter();

  constructor(
    private bookService: BookService,
  ) {
  }

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

}
