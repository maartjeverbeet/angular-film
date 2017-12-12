import {Subject} from 'rxjs/Subject';
import {Zaal} from '../shared/zaal.model';
import {Http, Headers} from '@angular/http';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';

@Injectable()
export class ZaalService {
  zalenChanged = new Subject<Zaal[]>();
  startedEditing = new Subject<number>();
  private headers = new Headers({ 'Content-Type': 'application/json'});
  private zalen: Zaal[];

  constructor(private http: Http ) {}

  getZaal(index: number) {
    return this.zalen[index];
  }

  getZalen() {
    return this.http.get(environment.serverUrl + '/zalen', {headers: this.headers})
      .toPromise()
      .then(response => {
        this.zalen = response.json() as Zaal[];
        return response.json() as Zaal[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  addZaal(zaal: Zaal) {
    zaal._id = null;
    this.http.post(environment.serverUrl + '/zalen', zaal, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.zalen.push(zaal);
        this.zalenChanged.next(this.zalen.slice());
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  addZalen(zalen: Zaal[]) {
    for (let i = 0; i < zalen.length; i++) {
      this.addZaal(zalen[i]);
    }
  }

  updateZaal(index: number, newZaal: Zaal) {
    const id = this.zalen[index]._id;
    newZaal._id = id;
    this.http.put(environment.serverUrl + '/zalen/' + id, newZaal , {headers: this.headers})
      .toPromise()
      .then(response => {
        this.zalenChanged.next(this.zalen.slice());
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  deleteZaal(index: number) {
    const id = this.zalen[index]._id;
    this.http.delete(environment.serverUrl + '/zalen/' + id, { headers: this.headers})
      .toPromise()
      .then(response => {
        this.zalen.splice(index, 1);
        this.zalenChanged.next(this.zalen.slice());
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
