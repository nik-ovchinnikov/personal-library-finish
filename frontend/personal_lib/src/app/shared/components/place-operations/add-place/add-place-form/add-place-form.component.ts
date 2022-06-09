import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CrudService } from 'src/app/shared/crud.service';
import { SubPlace } from 'src/app/shared/models/subPlace.model';
import { Place } from 'src/app/shared/models/place.model';
import { SubPlaceFormFactory } from './subplace-form-factory.service';
import { PlaceService } from '../../place.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-place-form',
  templateUrl: './add-place-form.component.html',
  styleUrls: ['./add-place-form.component.css']
})
export class AddPlaceFormComponent implements OnInit, OnDestroy {

  myForm: FormGroup = new FormGroup({});
  subForm: FormGroup = new FormGroup({});

  subplaces: SubPlace[] = [];
  showSubPlaceFormToggle: boolean = false;

  submitAdmition: boolean = !true;
  equalSubplaceNames: boolean = false;
  placeNameExistsInBase: boolean = false;
  formIsNotValid: boolean = true;

  equalSubPlaceNamesSubscribtion: Subscription = new Subscription();
  nameInDBSubscr = new Subscription();


  //Для обеспечения передачи типа предмета через url из главного меню
  urlParamSubscription = new Subscription();
  urlParam = "";


  constructor(
    private crudService: CrudService,
    private fb: FormBuilder,
    private subPlaceFormFactory: SubPlaceFormFactory,
    private placeService: PlaceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.urlParamSubscription = activatedRoute.params.subscribe(params => this.urlParam = params['urlParam']);
  }
  ngOnDestroy(): void {
    this.equalSubPlaceNamesSubscribtion.unsubscribe();
    this.nameInDBSubscr.unsubscribe()
  }

  get subPlaceArray() {
    return (<FormArray>this.myForm.get('subPlaces'));
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ["", Validators.required],
      description: [""],
      subPlaces: new FormArray([
      ]),
    });

    //подписка на результат проверки имени
    this.nameInDBSubscr = this.placeService.isExistNameInDBEmitter.subscribe((data) => {
      this.placeNameExistsInBase = data;
    })


    //подписка на изменеие формы. Тут главное valueChanges!!!
    this.myForm.valueChanges.subscribe( (v) => {
      this.placeService.places.next(v);
      // console.log(this.myForm.get('name').valid);
      //индикатор наличия названия у типа и подтипов
      this.formIsNotValid = !this.myForm.valid;
      this.placeService.checkName(this.myForm.get('name')?.value);


    });

    //подписка на индикатор повторения имён субтипов
    this.equalSubPlaceNamesSubscribtion = this.placeService.isRepeatsInSubplaceNamesArrayEmitter.subscribe(data => {
      this.equalSubplaceNames = data;
    });

    this.placeService.urlParam = this.urlParam;
  }


  onSubmit() {
    //обработка массива подтипов из формы
    this.subPlaceArrayRendering(this.myForm.value.subPlaces);
    // console.log(this.myForm.value);


    const newPlace = new Place(
      this.myForm.value.name,
      this.myForm.value.description,
      this.subplaces,
    );
    // console.log(newPlace);
    // console.log(this.Form);


    this.crudService.addDAO(
      newPlace,
      this.urlParam + '/place/add'
    );

    this.myForm.reset();
    this.ngOnInit();
    this.subplaces = [];
//
    //TODO обрабока ошибок (связь, повтор имени),
    //TODO переадрессация на другой компонент после получения и обработки ответа с сервера,
    //TODO Передать текст ошибки на следующую страницу,
    //TODOсделать кнопку назад у следующей страницы
    //TODO отправка запроса при напечатывании для проверки уникальности имени.
    //TODO переделвть через сервис, а в него поместить DAO
  }

  //при нажатии кнопки добавить подтип
  onAddSubPlace() {
    this.subPlaceArray.push(this.subPlaceFormFactory.getSubPlaceForm());
  }
  //при нажатии кнопки удалить подтип
  removeSubPlace(i: number) {
    this.subPlaceArray.removeAt(i);
  }

  //составление массива подтипов для отправки на сервер
  subPlaceArrayRendering(subPlaceArr: any) {
    for(let st of subPlaceArr) {
      this.subplaces.push(new SubPlace(
        st.subPlaceName,
        st.subPlaceDescription,
        st.subPlace,
        new Date(),
        this.myForm.value.name,
      ));
    }
  }

  onNameKeyUp(event: any) {
    let name: string = event.target.value;
    this.placeService.checkName(name);
  }

  backToMenu(){
    this.router.navigateByUrl('/');
  }
}
