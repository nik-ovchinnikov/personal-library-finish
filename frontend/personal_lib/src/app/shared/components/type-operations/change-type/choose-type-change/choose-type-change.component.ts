import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Type } from 'src/app/shared/models/type.model';
import { TypeService } from '../../type.service';

@Component({
  selector: 'app-choose-type-change',
  templateUrl: './choose-type-change.component.html',
  styleUrls: ['./choose-type-change.component.css']
})
export class ChooseTypeChangeComponent implements OnInit, OnDestroy{
  types: Type[] = [];

  typesToShow: Type[] = [];
  typesToShowSubscription = new Subscription();

  //Для обеспечения передачи типа предмета через url из главного меню
  urlParamSubscription = new Subscription();
  urlParam = "";


  constructor(
    private ts: TypeService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.urlParamSubscription = activatedRoute.params.subscribe(params => this.urlParam = params['urlParam']);
  }

  ngOnInit(): void {
    this.typesToShowSubscription = this.ts.typesAfterFilterAndSortEmitter.subscribe(typeArray => {
      this.typesToShow = typeArray;
    });
    this.ts.urlParam = this.urlParam;
  }

  ngOnDestroy(): void {
    this.typesToShowSubscription.unsubscribe();
  }

  chooseChangeItem(type: Type) {
    console.log(type);
    this.ts.typeToChange = type;
  }

}
