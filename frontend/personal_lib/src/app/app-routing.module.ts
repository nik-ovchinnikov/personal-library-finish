import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {AddBookFormComponent} from "./item-operations/book/add-book/add-book-form/add-book-form.component";
import {BookAddSubmitComponent} from "./item-operations/book/add-book/book-add-submit/book-add-submit.component";
import {ChooseBookDeleteComponent} from "./item-operations/book/delete-book/choose-book-delete/choose-book-delete.component";
import {DeleteBookSubmitComponent} from "./item-operations/book/delete-book/delete-item-submit/delete-book-submit.component";
import {ChooseBookChangeComponent} from "./item-operations/book/change-book/choose-book-change/choose-book-change.component";
import {BookChangeFormComponent} from "./item-operations/book/change-book/book-change-form/book-change-form.component";
import {AfterBookChangeSubmitComponent} from "./item-operations/book/change-book/after-book-change-submit/after-book-change-submit.component";
import {AddBookComponent} from "./item-operations/book/add-book/add-book.component";
import {ChangeBookComponent} from "./item-operations/book/change-book/change-book.component";
import {DeleteBookComponent} from "./item-operations/book/delete-book/delete-book.component";
import {ShowBooksComponent} from "./item-operations/book/show-books/show-books.component";
import {AddTypeFormComponent} from "./shared/components/type-operations/add-type/add-type-form/add-type-form.component";
import {TypeAddSubmitComponent} from "./shared/components/type-operations/add-type/type-add-submit/type-add-submit.component";
import {ChooseTypeDeleteComponent} from "./shared/components/type-operations/delete-type/choose-type-delete/choose-type-delete.component";
import {ChooseTypeChangeComponent} from "./shared/components/type-operations/change-type/choose-type-change/choose-type-change.component";
import {TypeChangeFormComponent} from "./shared/components/type-operations/change-type/type-change-form/type-change-form.component";
import {AfterChangeTypeSubmitComponent} from "./shared/components/type-operations/change-type/after-change-type-submit/after-change-type-submit.component";
import {AddTypeComponent} from "./shared/components/type-operations/add-type/add-type.component";
import {ChangeTypeComponent} from "./shared/components/type-operations/change-type/change-type.component";
import {DeleteTypeComponent} from "./shared/components/type-operations/delete-type/delete-type.component";
import {ShowTypesComponent} from "./shared/components/type-operations/show-types/show-types.component";
import {AddPlaceFormComponent} from "./shared/components/place-operations/add-place/add-place-form/add-place-form.component";
import {PlaceAddSubmitComponent} from "./shared/components/place-operations/add-place/place-add-submit/place-add-submit.component";
import {ChoosePlaceDeleteComponent} from "./shared/components/place-operations/delete-place/choose-place-delete/choose-place-delete.component";
import {DeletePlaceSubmitComponent} from "./shared/components/place-operations/delete-place/delete-place-submit/delete-place-submit.component";
import {ChoosePlaceChangeComponent} from "./shared/components/place-operations/change-place/choose-place-change/choose-place-change.component";
import {PlaceChangeFormComponent} from "./shared/components/place-operations/change-place/place-change-form/place-change-form.component";
import {AfterChangePlaceSubmitComponent} from "./shared/components/place-operations/change-place/after-change-place-submit/after-change-place-submit.component";
import {AddPlaceComponent} from "./shared/components/place-operations/add-place/add-place.component";
import {ChangePlaceComponent} from "./shared/components/place-operations/change-place/change-place.component";
import {DeletePlaceComponent} from "./shared/components/place-operations/delete-place/delete-place.component";
import {ShowPlacesComponent} from "./shared/components/place-operations/show-places/show-places.component";
import {MainMenuComponent} from "./header/main-menu/main-menu.component";
import {ContactsComponent} from "./header/contacts/contacts.component";
import {AboutComponent} from "./header/about/about.component";
import {SendBackupComponent} from "./header/send-backup/send-backup.component";
import {SaveChangesComponent} from "./header/save-changes/save-changes.component";
import {BookComponent} from "./item-operations/book/book.component";
import {TypeOperationsComponent} from "./shared/components/type-operations/type-operations.component";
import {PlaceOperationsComponent} from "./shared/components/place-operations/place-operations.component";
import {DeleteTypeSubmitComponent} from "./shared/components/type-operations/delete-type/delete-type-submit/delete-type-submit.component";
import { LoginComponent } from "./auth/login/login.component";
import { LogoutComponent } from "./auth/logout/logout.component";

// определение маршрутов

      // для предметов
            //добавление
            const addItemRouts: Routes = [
              { path: 'form', component: AddBookFormComponent},
              { path: 'after-submit', component: BookAddSubmitComponent},
            ];

            //удаление
            const deleteItemRouts: Routes = [
              { path: 'choose', component: ChooseBookDeleteComponent},
              { path: 'after-submit', component: DeleteBookSubmitComponent},
            ];


            //изменеие
            const changeItemRouts: Routes = [
              { path: 'choose', component: ChooseBookChangeComponent},
              { path: 'change-form', component: BookChangeFormComponent},
              { path: 'after-submit', component: AfterBookChangeSubmitComponent},
            ];

      //общий для предметов
      const itemRouts: Routes = [
        { path: 'add', component: AddBookComponent, children: addItemRouts},
        { path: 'change', component: ChangeBookComponent, children: changeItemRouts},
        { path: 'delete', component: DeleteBookComponent, children: deleteItemRouts},
        { path: 'show', component: ShowBooksComponent},
      ];

      // для типов
            //добавление
            const addTypeRouts: Routes = [
              { path: 'form/:urlParam', component: AddTypeFormComponent},
              { path: 'after-submit', component: TypeAddSubmitComponent},
            ];

            //удаление
            const deleteTypeRouts: Routes = [
              { path: 'choose/:urlParam', component: ChooseTypeDeleteComponent},
              { path: 'after-submit', component: DeleteTypeSubmitComponent},
            ];


            //изменение
            const changeTypeRouts: Routes = [
              { path: 'choose/:urlParam', component: ChooseTypeChangeComponent},
              { path: 'change-form', component: TypeChangeFormComponent},
              { path: 'after-submit', component: AfterChangeTypeSubmitComponent},
            ];

      //общий для типов
      const typeRouts: Routes = [
        { path: 'add', component: AddTypeComponent, children: addTypeRouts},
        { path: 'change', component: ChangeTypeComponent, children: changeTypeRouts},
        { path: 'delete', component: DeleteTypeComponent, children: deleteTypeRouts},
        { path: 'show/:urlParam', component: ShowTypesComponent},
      ];

      // для мест
            //добавление
            const addPlaceRouts: Routes = [
              { path: 'form/:urlParam', component: AddPlaceFormComponent},
              { path: 'after-submit', component: PlaceAddSubmitComponent},
            ];

            //удаление
            const deletePlaceRouts: Routes = [
              { path: 'choose/:urlParam', component: ChoosePlaceDeleteComponent},
              { path: 'after-submit', component: DeletePlaceSubmitComponent},
            ];


            //изменение
            const changePlaceRouts: Routes = [
              { path: 'choose/:urlParam', component: ChoosePlaceChangeComponent},
              { path: 'change-form', component: PlaceChangeFormComponent},
              { path: 'after-submit', component: AfterChangePlaceSubmitComponent},
            ];

      //общий для мест
      const placeRouts: Routes = [
        { path: 'add', component: AddPlaceComponent, children: addPlaceRouts},
        { path: 'change', component: ChangePlaceComponent, children: changePlaceRouts},
        { path: 'delete', component: DeletePlaceComponent, children: deletePlaceRouts},
        { path: 'show/:urlParam', component: ShowPlacesComponent},
      ];

const appRoutes: Routes =[
  { path: '', component: MainMenuComponent},
  { path: 'contacts', component: ContactsComponent},
  { path: 'about', component: AboutComponent},
  { path: 'send-backup', component: SendBackupComponent},
  { path: 'save-changes', component: SaveChangesComponent},
  // { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'book', component: BookComponent, children: itemRouts},
  { path: 'item', component: BookComponent, children: itemRouts},
  { path: 'item', component: BookComponent, children: itemRouts},
  { path: 'item', component: BookComponent, children: itemRouts},
  { path: 'item', component: BookComponent, children: itemRouts},
  { path: 'type', component: TypeOperationsComponent, children: typeRouts},
  { path: 'place', component: PlaceOperationsComponent, children: placeRouts},
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule{}
