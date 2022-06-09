import {NgModule} from "@angular/core";
import {BookComponent} from "./book.component";
import {AddBookComponent} from "./add-book/add-book.component";
import {ChangeBookComponent} from "./change-book/change-book.component";
import {DeleteBookComponent} from "./delete-book/delete-book.component";
import {ShowBooksComponent} from "./show-books/show-books.component";
import {AddBookFormComponent} from "./add-book/add-book-form/add-book-form.component";
import {BookAddSubmitComponent} from "./add-book/book-add-submit/book-add-submit.component";
import {ChooseBookDeleteComponent} from "./delete-book/choose-book-delete/choose-book-delete.component";
import {DeleteBookSubmitComponent} from "./delete-book/delete-item-submit/delete-book-submit.component";
import {ChooseBookChangeComponent} from "./change-book/choose-book-change/choose-book-change.component";
import {BookChangeFormComponent} from "./change-book/book-change-form/book-change-form.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../app-routing.module";
import {RouterModule} from "@angular/router";
import { AfterBookChangeSubmitComponent } from './change-book/after-book-change-submit/after-book-change-submit.component';
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { FilterByNamePipe } from "./pipes/filterBook.pipe";
import { BookListFilterComponent } from './book-list-filter/book-list-filter.component';

@NgModule({
  declarations: [
    BookComponent,
    AddBookComponent,
    ChangeBookComponent,
    DeleteBookComponent,
    ShowBooksComponent,
    AddBookFormComponent,
    BookAddSubmitComponent,
    ChooseBookDeleteComponent,
    DeleteBookSubmitComponent,
    ChooseBookChangeComponent,
    BookChangeFormComponent,
    AfterBookChangeSubmitComponent,

    FilterByNamePipe,
      BookListFilterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,

    SharedModule,
  ],
  exports: [
    BookComponent,
    AddBookComponent,
    ChangeBookComponent,
    DeleteBookComponent,
    ShowBooksComponent,
    AddBookFormComponent,
    BookAddSubmitComponent,
    ChooseBookDeleteComponent,
    DeleteBookSubmitComponent,
    ChooseBookChangeComponent,
    BookChangeFormComponent,
    AfterBookChangeSubmitComponent,
  ],
  providers: [],
})
export class BookModule {

}
