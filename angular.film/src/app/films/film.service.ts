/**
 * Created by maartje on 4-12-2017.
 */
import {Film} from './film.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Http, Headers} from '@angular/http';
import {environment} from '../../environments/environment';

@Injectable()
export class FilmService {
  filmsChanged = new Subject<Film[]>();
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private films: Film[];

  constructor(private http: Http) {}

  getFilm(index: string) {
    return this.http.get(environment.serverUrl + '/films/' + index, { headers: this.headers })
      .toPromise()
      .then(response => {
        return response.json() as Film;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  getFilms() {
    return this.http.get(environment.serverUrl + '/films', { headers: this.headers })
      .toPromise()
      .then(response => {
        this.films = response.json() as Film[];
        return response.json() as Film[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  addFilm(film: Film) {
    this.http.post(environment.serverUrl + '/films', film , { headers: this.headers })
      .toPromise()
      .then(response => {
        this.filmsChanged.next(this.films.slice());
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  updateFilm(index: string, newFilm: Film) {
    this.http.put(environment.serverUrl + '/films/' + index, newFilm , { headers: this.headers })
      .toPromise()
      .then(response => {
        this.filmsChanged.next(this.films.slice());
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  deleteFilm(index: string) {
    this.http.delete(environment.serverUrl + '/films/' + index, { headers: this.headers })
      .toPromise()
      .then(response => {
        this.filmsChanged.next(this.films.slice());
      })
    .catch(error => {
      return this.handleError(error);
    });
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
