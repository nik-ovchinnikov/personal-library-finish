import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Type } from 'src/app/shared/models/type.model';
import { TypeService } from '../type.service';

@Component({
  selector: 'app-show-types',
  templateUrl: './show-types.component.html',
  styleUrls: ['./show-types.component.css']
})
export class ShowTypesComponent implements OnInit, OnDestroy {
//Для этих свойств нжуно установить привязку от дочернего элумента к родительскому
  typesToShow: Type[] = [];

  allTypeListSub: Subscription = new Subscription();
  // timerID: any;

  typesToShowSubscription = new Subscription();

  //Для обеспечения передачи типа предмета через url из главного меню
  urlParamSubscription = new Subscription();
  urlParam = "";



  constructor(
    private typeServ: TypeService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.urlParamSubscription = activatedRoute.params.subscribe(params => this.urlParam = params['urlParam']);
  }

  ngOnInit(): void {

    this.typesToShowSubscription = this.typeServ.typesAfterFilterAndSortEmitter.subscribe(typeArray => {
      this.typesToShow = typeArray;
    });
    this.typeServ.urlParam = this.urlParam;
  }

  ngOnDestroy(): void {
    this.typesToShowSubscription.unsubscribe();
  }



}

