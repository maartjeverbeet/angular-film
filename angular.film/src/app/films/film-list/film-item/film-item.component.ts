import {Component, Input, OnInit} from '@angular/core';
import {Film} from '../../film.model';

@Component({
  selector: 'app-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css']
})
export class FilmItemComponent implements OnInit {
  @Input() film: Film;
  @Input() index: number;

  ngOnInit() {
  }

}
