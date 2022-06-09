import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Place } from 'src/app/shared/models/place.model';
import { PlaceService } from '../../place.service';

@Component({
  selector: 'app-choose-place-change',
  templateUrl: './choose-place-change.component.html',
  styleUrls: ['./choose-place-change.component.css']
})
export class ChoosePlaceChangeComponent implements OnInit, OnDestroy {

  places: Place[] = [];

  placesToShow: Place[] = [];
  placesToShowSubscription = new Subscription();

  //Для обеспечения передачи типа предмета через url из главного меню
  urlParamSubscription = new Subscription();
  urlParam = "";


  constructor(
    private ps: PlaceService,
    private activatedRoute: ActivatedRoute
  ) {
    this.urlParamSubscription = activatedRoute.params.subscribe(params => this.urlParam = params['urlParam']);
  }
  ngOnInit(): void {
    this.placesToShowSubscription = this.ps.placesAfterFilterAndSortEmitter.subscribe(placeArray => {
      this.placesToShow = placeArray;
    });
    console.log(this.urlParam);
    this.ps.urlParam = this.urlParam;
  }

  ngOnDestroy(): void {
    this.placesToShowSubscription.unsubscribe();
  }

  chooseChangeItem(place: Place) {
    console.log(place);
    this.ps.placeToChange = place;
  }
}
