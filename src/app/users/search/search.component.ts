import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Store} from "@ngxs/store";
import {SearchAction} from "../store/users.actions";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    form = new FormGroup({
        search: new FormControl('')
    });

  constructor(private store: Store) { }

  ngOnInit() {
      this.form.get('search').valueChanges.subscribe(v => this.store.dispatch(new SearchAction(v)));
  }

}