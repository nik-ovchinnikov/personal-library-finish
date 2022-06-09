import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlaceService } from 'src/app/shared/components/place-operations/place.service';
import { TypeService } from 'src/app/shared/components/type-operations/type.service';
import { Book } from 'src/app/shared/models/book.model';
import { BookPicture } from 'src/app/shared/models/bookPicture.model';
import { Place } from 'src/app/shared/models/place.model';
import { SubPlace } from 'src/app/shared/models/subPlace.model';
import { SubType } from 'src/app/shared/models/subType.model';
import { Type } from "src/app/shared/models/type.model";
import { BookService } from '../../book.service';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-book-form.component.html',
  styleUrls: ['./add-book-form.component.css']
})
export class AddBookFormComponent implements OnInit, OnDestroy {

  myForm: FormGroup = new FormGroup({});

  placeList: Place[] = [];
  typeList: Type[] = [];
  chosenType: Type = new Type();
  chosenPlace: Place= new Place();
  chosenSubType: SubType = new SubType();
  chosenSubPlace: SubPlace= new SubPlace();

  tester: any;

  //подписки
  placeListSubscr: Subscription = new Subscription();
  typeListSubscr: Subscription = new Subscription();

  //маркеры валидации
  bookKeyExistsInBase: boolean = false;
  keyCheckSubscription: Subscription = new Subscription();

  formIsNotValid: boolean = true;

  //объекты картинок для записи в базу
  itemPicturesToWrite: BookPicture[] = [];

  controlsBookPictures: AbstractControl[] = [];
  bookPictures: BookPicture[] = [];



  constructor(
    private router: Router,
    private fb: FormBuilder,
    private typeService: TypeService,
    private placeService: PlaceService,
    private bookService: BookService,
    private http: HttpClient,
  ) { }
  ngOnDestroy(): void {
    this.placeListSubscr.unsubscribe();
    this.typeListSubscr.unsubscribe();
    this.keyCheckSubscription.unsubscribe();
  }

  ngOnInit(): void {
    //очищаем массив с файлами
    this.bookService.selectedFiles = [];
    this.typeService.urlParam = 'book';
    this.placeService.urlParam = 'book';

    //получение типов и места хранения
    this.placeListSubscr = this.placeService.placeListEmitter.subscribe((data) => {
      this.placeList = data;
    });
    this.typeListSubscr = this.typeService.typeListEmitter.subscribe((data) => {
      this.typeList = data;
    });

    this.placeService.getAllPlaceList();
    this.typeService.getAllTypeList();

    //подписка на состаяние уникальности ключа
    this.keyCheckSubscription = this.bookService.isExistKeyInDBEmitter.subscribe((data) => {
      this.bookKeyExistsInBase = data;
    });

    //создание формы
    this.myForm = this.fb.group({
      name: ["", Validators.required],
      author: [""],
      publishYear: [""],
      publisher: [""],
      seria: [""],
      weight: [""],
      size: [""],
      key: ["", Validators.required],
      description: [""],
      typeName: ["", Validators.required],
      subTypeName: ["", Validators.required],
      placeName: ["", Validators.required],
      subPlaceName: ["", Validators.required],
      bookPictures: new FormArray([
      ]),
    });

    this.controlsBookPictures = (<FormArray>this.myForm.get('bookPictures')).controls;

    //подписки на изменение формы
    this.myForm.get("typeName")?.valueChanges.subscribe((data) => {
      this.tester = this.typeList.filter((type) => {
        return type.name.includes(data);
      });
      this.chosenType = this.tester[0];
      this.bookService.resultBook.bookType =this.chosenType;
    });

    this.myForm.get("placeName")?.valueChanges.subscribe((data) => {
      this.tester = this.placeList.filter((place) => {
        return place.name.includes(data);
      });
      this.chosenPlace= this.tester[0];
      this.bookService.resultBook.bookPlace = this.chosenPlace;
    });

    this.myForm.get("subTypeName")?.valueChanges.subscribe((data) => {
      this.tester = this.chosenType.bookSubTypeList.filter((subType) => {
        return subType.name.includes(data);
      });
      this.chosenSubType = this.tester[0];
      this.bookService.resultBook.bookSubType = this.chosenSubType;
    });

    this.myForm.get("subPlaceName")?.valueChanges.subscribe((data) => {
      this.tester = this.chosenPlace.bookSubPlaceList.filter((subPlace) => {
        return subPlace.name.includes(data);
      });
      this.chosenSubPlace = this.tester[0];
      this.bookService.resultBook.bookSubPlace = this.chosenSubPlace;
    });

    this.myForm.get("key")?.valueChanges.subscribe((data) => {
      this.bookService.checkKey(data);
      this.bookService.resultBook.key = data;
    });

    this.myForm.get("name")?.valueChanges.subscribe((data) => {
      this.bookService.resultBook.name= data;
    });

    this.myForm.get("description")?.valueChanges.subscribe((data) => {
      this.bookService.resultBook.description= data;
    });

    this.myForm.get("author")?.valueChanges.subscribe((data) => {
      this.bookService.resultBook.author= data;
    });

    this.myForm.get("publishYear")?.valueChanges.subscribe((data) => {
      this.bookService.resultBook.publishYear= data;
    });

    this.myForm.get("publisher")?.valueChanges.subscribe((data) => {
      this.bookService.resultBook.publisher= data;
    });

    this.myForm.get("seria")?.valueChanges.subscribe((data) => {
      this.bookService.resultBook.seria= data;
    });

    this.myForm.get("weight")?.valueChanges.subscribe((data) => {
      this.bookService.resultBook.weight= data;
    });

    this.myForm.get("size")?.valueChanges.subscribe((data) => {
      this.bookService.resultBook.size = data;
    });

    this.myForm.valueChanges.subscribe(() => {
      this.formIsNotValid = !this.myForm.valid;
    });

  }

  backToMenu() {
    this.router.navigateByUrl('/');
  }

  //проверка уникальности ключа
  onKeyInputPrint(event: any) {
    let key = event.target.value;
  }

  onSubmit() {

    //Даты не забудь!!!
    this.bookService.resultBook.creationDate = new Date();
    this.bookService.resultBook.lastChangeDate= new Date();
    console.log("ResultBook");
    console.log(this.bookService.resultBook);
    //Переименовка файла после добавления книги
    // сброс формы, удаление всех фото, обнуления массива FormFrray и selectedFiles
    this.bookService.addBook()
    .subscribe(names => {
        let i = 0;
        // Запрос с добавлением файлов
        for (let file of this.bookService.selectedFiles) {
            const fd = new FormData();
            fd.append("file", file);
            fd.append("fileName", names[i]);
            this.http.post(
              '/book-files/addFile',
              fd
            ).subscribe( res => {});
            i++;
        }


        this.bookService.selectedFiles = [];
        this.bookService.resultBook.bookPictureList = [];
        this.chosenType = new Type();
        this.chosenPlace = new Place();
        this.chosenSubType = new SubType();
        this.chosenSubPlace = new SubPlace();
        this.bookService.resultBook.bookSubPlace = new SubPlace();
        this.bookService.resultBook.bookSubType= new SubType();

        this.ngOnInit();
        this.formIsNotValid = true;
    });
    // this.myForm.reset();
    // this.myForm.get("bookPictures")?.setValue(new FormArray([]));
  }

   //По нажатии кнопки добавляет ещё одну форму для выгрузки фойла
  onAddPhotoPath() {
    const control = new FormControl(null);
    (<FormArray>this.myForm.get('bookPictures')).push(control);
  }

  //после нажатия на кнопку "удалить"
  onClickDeletePicture(event: any) {
    console.log("Test deleting");
    // event.preventDefault();
    let fileToRemove: File = new File([], "");
    let fileNameToRemove = event.target.getAttribute("fileName");

    //можно заменить фильтром или пайпом
    if(fileNameToRemove != null) {
      this.bookService.selectedFiles.forEach((file) => {
        if(file.name == fileNameToRemove) {
          fileToRemove = file;
        }
      });

      this.bookService.selectedFiles.splice(this.bookService.selectedFiles.indexOf(fileToRemove), 1);
      //непосредственно удаление

      // if(event.target.parentNode.parentNode.) {
        event.target.parentNode.parentNode.remove();
      // }
      //удалить обхект картинки из resultBook

      this.bookService.resultBook.bookPictureList.splice(this.bookService.resultBook.bookPictureList.length - 1, 1);
    }else {
        event.target.parentNode.parentNode.remove();
    }
  }

    //Действия после добавления файла
    onFileAdded(event: any) {
          if(event.target.nextSibling.getAttribute("wasUploaded") == "false"){

            event.target.nextSibling.setAttribute("fileName", event.target.files[0].name);
            event.target.nextSibling.setAttribute("wasUploaded", "true");
            //проверка имени файла на уникальность


            //добавление файла в массив
            this.bookService.selectedFiles.push(event.target.files[0]);
            //добавление в итоговый объект картинку
            this.bookService.resultBook.bookPictureList.push(new BookPicture());
          }else{
            //удаляем старую фото
            let fileToRemove: File =  new File([], "");
            let fileNameToRemove = event.target.nextSibling.getAttribute("fileName");
            this.bookService.selectedFiles.forEach((file) => {
              if(file.name == fileNameToRemove) {
                fileToRemove = file;
              }
            });
            this.bookService.selectedFiles.splice(this.bookService.selectedFiles.indexOf(fileToRemove), 1);

            //проверка имени на уникальность


            //добавляем новое фото
            event.target.nextSibling.setAttribute("fileName", event.target.files[0].name);
            this.bookService.selectedFiles.push(event.target.files[0]);
            console.log(this.bookService.selectedFiles);

          }
          //передадим этот файл в изображение
          //перенести в службу!!!! addItem
          const reader = new FileReader();
          reader.onloadend = () => {
            event.target.nextSibling.nextSibling.src = reader.result;
          }
          reader.readAsDataURL(event.target.files[0]);
    }
}
