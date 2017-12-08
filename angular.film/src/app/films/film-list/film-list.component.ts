import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Film} from '../film.model';
import {FilmService} from '../film.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit, OnDestroy {
  films: Film[];
  subscription: Subscription;

  constructor(private filmService: FilmService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.filmService.filmsChanged
      .subscribe(
        (films: Film[]) => {
          this.filmService.getFilms()
            .then(res => {
              this.films = res;
            });
        }
      );
    this.filmService.getFilms()
      .then(films => this.films = films)
      .catch(error => console.log(error));
  }

  onNewFilm() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
