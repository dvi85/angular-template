import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { debounce, filter, merge } from "rxjs/operators";
import { MatSnackBar } from "@angular/material";
import { AuthService } from "./auth.service";
import {Router} from "@angular/router";

@Component({
  selector: "auth-login",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit {
  hide: boolean = true;
  snackBarRef;

  form = new FormGroup({
    login: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  });

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
  }

  login() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe(() => this.router.navigate(['/', 'users', 'list']));
    }
  }
}
