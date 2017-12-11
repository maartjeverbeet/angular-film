import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FilmService} from '../film.service';

@Component({
  selector: 'app-film-start',
  templateUrl: './film-start.component.html',
  styleUrls: ['./film-start.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FilmStartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
