import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthLoginAction} from "./store/auth.actions";
import {Select, Store} from '@ngxs/store';
import {debounce, filter, merge} from "rxjs/operators";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'auth-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    @Select(state => state.auth.authFailed) authFailed$;

    hide: boolean = true;
    snackBarRef;

    form = new FormGroup({
        login: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });


    constructor(private store: Store, private snackBar: MatSnackBar) {}


    ngOnInit(): void {
        this.authFailed$.pipe(filter(Boolean))
            .subscribe(v => this.snackBarRef = this.snackBar.open('Login failed'));

        this.authFailed$.pipe(filter(Boolean)).pipe(
            debounce(() => this.form.get('login').valueChanges.pipe(merge(this.form.get('password').valueChanges)))
        ).subscribe(v => this.snackBarRef.dismiss());
    }

    login() {
        if (this.form.valid) {
            this.store.dispatch(new AuthLoginAction(this.form.value));
        }
    }
}