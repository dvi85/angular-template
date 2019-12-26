import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
  selector: 'app-authorisation',
  templateUrl: './authorisation.component.html',
  styleUrls: ['./authorisation.component.css']
})
export class AuthorisationComponent implements OnInit {
  token: string;

  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.authService.setTokenFromGoogle(this.token);
    });
  }

}
