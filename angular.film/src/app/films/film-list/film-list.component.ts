import {Component, Input, OnInit} from '@angular/core';
import {Film} from '../film.model';
import {FilmService} from '../film.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {
  films: Film[];

  constructor(private filmService: FilmService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.films = this.filmService.getFilms();
  }

  onNewFilm() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
