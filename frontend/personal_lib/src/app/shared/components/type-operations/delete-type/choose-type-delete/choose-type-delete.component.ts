import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs/internal/Subscription';
import { Type } from 'src/app/shared/models/type.model';
import { TypeService } from '../../type.service';

@Component({
  selector: 'app-choose-type-delete',
  templateUrl: './choose-type-delete.component.html',
  styleUrls: ['./choose-type-delete.component.css']
})
export class ChooseTypeDeleteComponent implements OnInit {

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

  onDeleteBtnClick(event: any) {
    //TODO Тут можно воспоьзоваться ViewChild
    // let deleteItemIndex = event.target.previousSibling.previousSibling.innerHTML;
    let deleteItemIndex = event.target.id;
    // console.log(deleteItemIndex);
    let typeToDelete = this.typesToShow[deleteItemIndex];

    //Добавить в массив для удаления
    this.ts.typesToDelete.push(typeToDelete);
    //Убрать из основного массива
    this.typesToShow.splice(deleteItemIndex, 1);
    // console.log(this.ts.typesToDelete);
  }
  cancelDeletes() {
    this.typesToShow = this.typesToShow.concat(this.ts.typesToDelete);
    this.ts.typesToDelete = [];
  }

  submitDelete(){
    this.ts.deleteTypes();
  }

}

