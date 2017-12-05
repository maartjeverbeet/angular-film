import { Component, OnInit } from '@angular/core';
import {FilmService} from './film.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css'],
  providers: [FilmService]
})
export class FilmsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
