import {Component, Input, OnInit} from '@angular/core';
import {Film} from '../../film.model';
import {FilmService} from '../../film.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css']
})
export class FilmItemComponent implements OnInit {
  @Input() film: Film;
  @Input() index: string;

  ngOnInit() {
    this.index = this.film._id;
  }

}
