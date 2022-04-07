import { Component, OnInit } from '@angular/core';
import {HashService} from "../services/hash.service";

@Component({
  selector: 'app-login',
  templateUrl: `./login.component.html`,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  handleLogin(): void{
    window.location.href = (this.hash.generateRedirectURL());
  }

  constructor(private hash: HashService) { }

  ngOnInit(): void {
  }

}
