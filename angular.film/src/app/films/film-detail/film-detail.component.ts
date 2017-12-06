import { Component, OnInit } from '@angular/core';
import {Film} from '../film.model';
import {FilmService} from '../film.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit {
  film: Film;
  id: number;

  constructor(private filmService: FilmService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.film = this.filmService.getFilm(this.id);
        }
      );
  }

  onEditFilm() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

}
