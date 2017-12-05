/**
 * Created by maartje on 4-12-2017.
 */
import {Film} from './film.model';
import {Injectable} from '@angular/core';

@Injectable()
export class FilmService {

  private films: Film[] = [
    new Film (
      'Soof',
      'Soof is een Nederlandse romantische komedie uit 2013 onder regie van Antoinette Beumer.',
      'https://media.pathe.nl/nocropthumb/620x955/gfx_content/posters/soof1.jpg'
    ),
    new Film (
      'Soof 2',
      'Soof is een Nederlandse romantische komedie uit 2013 onder regie van Antoinette Beumer.',
      'https://media.pathe.nl/thumb/180x254/gfx_content/posters/soof2poster123.jpg'
    )
  ];

  constructor() {}

  getFilms() {
    return this.films.slice();
  }

  getFilm(id: number) {
    return this.films[id];
  }
}
