import { Component, OnDestroy, OnInit } from '@angular/core';
import { Place } from 'src/app/shared/models/place.model';
import { Subscription } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { PlaceService } from '../place.service';

@Component({
  selector: 'app-place-filter-sort',
  templateUrl: './place-filter-sort.component.html',
  styleUrls: ['./place-filter-sort.component.css']
})
export class PlaceFilterSortComponent implements OnInit, OnDestroy {

  places: Place[] = [];
  placesSubscription = new Subscription();

  placesAfterFilter: Place[] = [];

  filterForm = this.fb.group({
    "byName": [""],
    "fromCreationDate": [new Date(1970,1,1)],
    "tillCreationDate": [new Date(6999,1,1)],
    "fromLastChange": [new Date(1970,1,1)],
    "tillLastChange": [new Date(5970,1,1)],
    "byWordsInDescription": [""],
    "bySubplacesName": [""],
    "sortType": ["changeDateDESC"],
  });

  constructor(
    private fb: FormBuilder,
    private ts: PlaceService,
  ) { }

  ngOnDestroy(): void {
    this.placesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.ts.getAllPlaceList();
    this.placesSubscription = this.ts.placeListEmitter.subscribe((placeArray) => {
      this.places = placeArray;
    });

    this.filterForm.valueChanges.subscribe((filterData: any) => {
      this.ts.filterArrayTransfer(
        this.sortFilteredArray(
          filterData,
           this.placeArrayfilter(filterData)
        )
      );
    });
  }


  placeArrayfilter(filterData: any): Place[] {
      this.placesAfterFilter = this.places.filter((place) => {
        return place.name.includes(filterData.byName)
          && place.description.includes(filterData.byWordsInDescription)
          && place.subplacesToString().includes(filterData.bySubplacesName)
          && (+ new Date(place.creationDate) > + new Date(filterData.fromCreationDate))
          && (+ new Date(place.creationDate) < + new Date(filterData.tillCreationDate))
          && (+ new Date(place.lastChangeDate) > + new Date(filterData.fromLastChange))
          && (+ new Date(place.lastChangeDate) < + new Date(filterData.tillLastChange));
      });
      return this.placesAfterFilter;
  }

  filtersReset() {
    //TODO прописать сброс значений для каждого параметра отделнь
    this.filterForm.reset({
      "byName": "",
      "fromCreationDate": new Date(1970,1,1),
      "tillCreationDate": new Date(6970,1,1),
      "fromLastChange": new Date(1970,1,1),
      "tillLastChange": new Date(6970,1,1),
      "byWordsInDescription": "",
      "bySubplacesName": "",
      "sortType": "changeDateDESC",
    }

    );
  }

  sortFilteredArray(filterData: any, array: Place[]): Place[] {
    if(filterData.sortType== "changeDateDESC") {
      return this.sortByLastChangeDate(array);
    }else if(filterData.sortType == "changeDateASC") {
      return this.sortByLastChangeDate(array).reverse();
    }else if(filterData.sortType == "creatDateDESC") {
      return this.sortByCreationDate(array).reverse();
    }else if(filterData.sortType == "creatDateASC") {
      return this.sortByCreationDate(array);
    }else if(filterData.sortType == "byNameDESC") {
      return this.sortByName(array).reverse();
    }else if(filterData.sortType == "byNameASC") {
      return this.sortByName(array);
    }else {
      console.log(
        "ERROR!!! CHOOSE SORT TYPE!!!"
      );
      return [];
    }
  }
  sortByCreationDate(array: Place[]) {
    array = array.sort((a, b) => {
      if(+ new Date(a.creationDate) > + new Date(b.creationDate)) {
        return 1;
      } else if (+ new Date(a.creationDate) == + new Date(b.creationDate)) {
        return 0;
      } else {
        return -1;
      }
    });
    return array;

  }

  sortByLastChangeDate(array: Place[]) {
    array = array.sort((a, b) => {
      if(+ new Date(a.lastChangeDate) > + new Date(b.lastChangeDate)) {
        return 1;
      } else if (+ new Date(a.lastChangeDate) == + new Date(b.lastChangeDate)) {
        return 0;
      } else {
        return -1;
      }
    });
    return array;
  }
  sortByName(array: Place[]) {
    array = array.sort((a, b) => {
      if(a.name > b.name) {
        return 1;
      } else if (a.name == b.name) {
        return 0;
      } else {
        return -1;
      }
    });
    return array;

  }
}
