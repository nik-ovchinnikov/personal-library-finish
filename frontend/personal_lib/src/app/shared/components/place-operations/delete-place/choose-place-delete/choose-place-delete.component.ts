import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Place } from 'src/app/shared/models/place.model';
import { PlaceService } from '../../place.service';

@Component({
  selector: 'app-choose-place-delete',
  templateUrl: './choose-place-delete.component.html',
  styleUrls: ['./choose-place-delete.component.css']
})
export class ChoosePlaceDeleteComponent implements OnInit {

  places: Place[] = [];

  placesToShow: Place[] = [];
  placesToShowSubscription = new Subscription();

  //Для обеспечения передачи типа предмета через url из главного меню
  urlParamSubscription = new Subscription();
  urlParam = "";



  constructor(
    private ps: PlaceService,
    private activatedRoute: ActivatedRoute,
  ) { 
    this.urlParamSubscription = activatedRoute.params.subscribe(params => this.urlParam = params['urlParam']);
  }

  ngOnInit(): void {
    this.placesToShowSubscription = this.ps.placesAfterFilterAndSortEmitter.subscribe(placeArray => {
      this.placesToShow = placeArray;
    });
    this.ps.urlParam = this.urlParam;
  }

  onDeleteBtnClick(event: any) {
    //TODO Тут можно воспоьзоваться ViewChild
    // let deleteItemIndex = event.target.previousSibling.previousSibling.innerHTML;
    let deleteItemIndex = event.target.id;
    // console.log(deleteItemIndex);
    let placeToDelete = this.placesToShow[deleteItemIndex];

    //Добавить в массив для удаления
    this.ps.placesToDelete.push(placeToDelete);
    //Убрать из основного массива
    this.placesToShow.splice(deleteItemIndex, 1);
    // console.log(this.ps.placesToDelete);
  }
  cancelDeletes() {
    this.placesToShow = this.placesToShow.concat(this.ps.placesToDelete);
    this.ps.placesToDelete = [];
  }

  submitDelete(){
    this.ps.deletePlaces();
  }
}
