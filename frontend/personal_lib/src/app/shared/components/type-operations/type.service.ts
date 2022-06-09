import { Injectable } from "@angular/core";
import { map, Subject, Subscription } from "rxjs";
import { CrudService } from "../../crud.service";
import { SubType } from "../../models/subType.model";
import { Type } from "../../models/type.model";

@Injectable({providedIn: 'root'})
export class TypeService {

    types = new Subject<Type[]>();
    typeListEmitter = new Subject<Type[]>();

    //для фильтра и сортировки списка
    typesAfterFilterAndSortEmitter = new Subject<Type[]>();

    //для валидации форм
    isRepeatsInSubtypeNamesArrayEmitter = new Subject<boolean>();
    isExistNameInDBEmitter = new Subject<boolean>();

    //для удаления
    typesToDelete: Type[] = [];
    typeToDeleteSubscription = new Subscription();

    //для изменения типа
    typeToChangeEmitter = new Subject<Type>();
    typeToChange: Type = new Type();
    oldType: Type = new Type();
    currentChangeTypeFormValues: any;

    //для изменения списка подтипов
    deletedSubtypes: SubType[] = [];
    changedSubtypes: SubType[] = [];
    newSubtypes: SubType[] = [];
    oldSubtypeArray: SubType[] = [];

    urlParam = "";


//TODO сделать touched На валидацию поля имя вначале


    constructor(
        private crudServ: CrudService,
    ){}

    filterArrayTransfer(arrayFiltered: Type[]) {
        this.typesAfterFilterAndSortEmitter.next(arrayFiltered);
    }

    getAllTypeList() {
        this.crudServ.getAllDAO<Type>(this.urlParam + '/type/getAll')

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
                    classArray.push(new Type(...argArray));
                    argArray = [];
                }
                return classArray;
            }))
            .subscribe(
                data => {
                    this.typeListEmitter.next(data);
                    this.typesAfterFilterAndSortEmitter.next(data);
                }

            );
    }

    checkName(name: string){
        this.crudServ.checkName(this.urlParam + '/type/checkName?name=' + name)
            .subscribe((data: { [key: string]: any}) => {
                let oldTypeName = "";
                let marker: number = 0;
                for(let key in data) {
                    marker++;
                    if(marker == 1){
                        oldTypeName = data[key].name;
                    }
                }
                if(marker > 0){
                    if((marker == 1) && (oldTypeName == this.oldType.name)) {
                        this.isExistNameInDBEmitter.next(false);
                    }else{
                        this.isExistNameInDBEmitter.next(true);
                    }
                }else{
                   this.isExistNameInDBEmitter.next(false);
                }
            });
    }

    deleteTypes() {
        let url = this.urlParam + "/type/deleteList";
        this.crudServ.deleteTypeList<Type>(url, this.typesToDelete)
            .subscribe((data) => {
                console.log(data);
            });
    }

    changeType(stArray: SubType[]) {
        //удалить из базы удалённые подтипы
        if(this.deletedSubtypes.length > 0){
            this.crudServ.deleteSubTypeList<SubType>(this.urlParam + '/subtype/deleteList', this.deletedSubtypes)
                .subscribe((data: any) => {
                }
            );
        }
        //составление массива подтипров для записи/изменеия
        console.log("Перед отправкой");
        console.log(this.typeToChange);
        //изменение
        this.crudServ.changeType(this.urlParam + '/type/updateType', this.typeToChange).subscribe((data) => {
            console.log(data);
        })

    }

}
