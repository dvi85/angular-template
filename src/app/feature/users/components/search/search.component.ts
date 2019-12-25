import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {switchMap, tap} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    form = new FormGroup({
        search: new FormControl('')
    });

    @Output() search: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
      this.search.emit('');
      this.form.valueChanges.subscribe((value => {
          this.search.emit(value);
      }))
  }

}
