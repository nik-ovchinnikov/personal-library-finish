import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Place } from 'src/app/shared/models/place.model';
import {PlaceService} from "../place.service";

@Component({
  selector: 'app-show-places',
  templateUrl: './show-places.component.html',
  styleUrls: ['./show-places.component.css']
})
export class ShowPlacesComponent implements OnInit, OnDestroy {
  placesToShow: Place[] = [];

  allPlaceListSub: Subscription = new Subscription();
  // timerID: any;

  placesToShowSubscription = new Subscription();

  //Для обеспечения передачи типа предмета через url из главного меню
  urlParamSubscription = new Subscription();
  urlParam = "";

  constructor(
    private placeServ: PlaceService,
    private activatedRoute: ActivatedRoute,
  ) { 
    this.urlParamSubscription = activatedRoute.params.subscribe(params => this.urlParam = params['urlParam']);
  }
 
  ngOnInit(): void {

    this.placesToShowSubscription = this.placeServ.placesAfterFilterAndSortEmitter.subscribe(placeArray => {
      this.placesToShow = placeArray;
    });
    console.log(this.urlParam);
    this.placeServ.urlParam = this.urlParam;
  }

  ngOnDestroy(): void {
    this.placesToShowSubscription.unsubscribe();
  }


}
