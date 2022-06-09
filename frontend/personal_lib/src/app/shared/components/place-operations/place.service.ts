import {map, Subject, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import { Place } from "src/app/shared/models/place.model";
import { SubPlace } from "src/app/shared/models/subPlace.model";
import { CrudService } from "src/app/shared/crud.service";

@Injectable({providedIn: 'root'})
export class PlaceService {
  places = new Subject<Place[]>();
  placeListEmitter = new Subject<Place[]>();

  //для фильтра и сортировки списка
  placesAfterFilterAndSortEmitter = new Subject<Place[]>();

  //для валидации форм
  isRepeatsInSubplaceNamesArrayEmitter = new Subject<boolean>();
  isExistNameInDBEmitter = new Subject<boolean>();

  //для удаления
  placesToDelete: Place[] = [];
  placeToDeleteSubscription = new Subscription();

  //для изменения типа
  placeToChangeEmitter = new Subject<Place>();
  placeToChange: Place = new Place();
  oldPlace: Place = new Place();
  currentChangePlaceFormValues: any;

  //для изменения списка подтипов
  deletedSubplaces: SubPlace[] = [];
  changedSubplaces: SubPlace[] = [];
  newSubplaces: SubPlace[] = [];
  oldSubplaceArray: SubPlace[] = [];

  //для параметризации адреса запроса из одного шаблона для разных видов предмктов
  urlParam = "";


//TODO сделать touched На валидацию поля имя вначале


  constructor(
      private crudServ: CrudService,
  ){}

  filterArrayTransfer(arrayFiltered: Place[]) {
      this.placesAfterFilterAndSortEmitter.next(arrayFiltered);
  }

  getAllPlaceList() {
      this.crudServ.getAllDAO<Place>(this.urlParam +'/place/getAll')

      //FIXME избавиться от any в index signature!!!
      //FIXME постараться обобщить пайп для всех методов!!! ПРОВАЛЕНО
      // 1) сделать интерфейс, в котором есть метод заполняющий поля,
      // 2) каждая модель наследует этот интерфейс
      // 3) это наследование прописывается в generic метода pipeDAO
      // 4) метод заполнения полей вызывается в pipeDAO, экземпляр вводится через аргументы
          .pipe(map((data: { [key: string]: any}) => {
              let classArray = [];
              for(let key in data) {
                  let argArray: string[] = [];
                  for(let key2 in data[key]) {
                      argArray.push(data[key][key2]);
                  }
                  classArray.push(new Place(...argArray));
                  argArray = [];
              }
              return classArray;
          }))
          .subscribe(
              data => {
                  this.placeListEmitter.next(data);
                  this.placesAfterFilterAndSortEmitter.next(data);
              }

          );
  }

  checkName(name: string){
      this.crudServ.checkName(this.urlParam +'/place/checkName?name=' + name)
          .subscribe((data: { [key: string]: any}) => {
              let oldPlaceName = "";
              let marker: number = 0;
              for(let key in data) {
                  marker++;
                  if(marker == 1){
                      oldPlaceName = data[key].name;
                  }
              }
              if(marker > 0){
                  if((marker == 1) && (oldPlaceName == this.oldPlace.name)) {
                      this.isExistNameInDBEmitter.next(false);
                  }else{
                      this.isExistNameInDBEmitter.next(true);
                  }
              }else{
                 this.isExistNameInDBEmitter.next(false);
              }
          });
  }

  deletePlaces() {
      let url = this.urlParam + "/place/deleteList";
      this.crudServ.deleteTypeList<Place>(url, this.placesToDelete)
          .subscribe((data) => {
              console.log(data);
          });
  }

  changePlace(stArray: SubPlace[]) {
      //удалить из базы удалённые подтипы
      if(this.deletedSubplaces.length > 0){
          this.crudServ.deleteSubTypeList<SubPlace>(this.urlParam + '/subplace/deleteList', this.deletedSubplaces)
              .subscribe((data: any) => {
              }
          );
      }
      //составление массива подтипров для записи/изменеия
      console.log("Перед отправкой");
      console.log(this.placeToChange);
      //изменение
      this.crudServ.changeType('book/place/update', this.placeToChange).subscribe((data) => {
          console.log(data);
      })

  }
}
