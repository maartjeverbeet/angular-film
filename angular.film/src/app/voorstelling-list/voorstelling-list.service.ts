
import {Subject} from 'rxjs/Subject';
import {Voorstelling} from '../shared/voorstelling.model';
import {Http, Headers} from '@angular/http';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';

@Injectable()
export class VoorstellingListService {
  voorstellingenChanged = new Subject<Voorstelling[]>();
  startedEditing = new Subject<number>();
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private voorstellingen: Voorstelling[];

  constructor(private http: Http) { }

  getVoorstellingen() {
    return this.http.get(environment.serverUrl + '/voorstellingen', { headers: this.headers })
      .toPromise()
      .then(response => {
        console.dir(response.json());
        this.voorstellingen = response.json() as Voorstelling[];
        return response.json() as Voorstelling[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  getVoorstelling(index: number) {
    return this.voorstellingen[index];
  }

  addVoorstelling(voorstelling: Voorstelling) {
    voorstelling._id = null;
    this.http.post(environment.serverUrl + '/voorstellingen', voorstelling , { headers: this.headers })
      .toPromise()
      .then(response => {
        this.voorstellingen.push(voorstelling);
        this.voorstellingenChanged.next(this.voorstellingen.slice());
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  addVoorstellingen(voorstellingen: Voorstelling[]) {
    for (let i = 0; i < voorstellingen.length; i++) {
      this.addVoorstelling(voorstellingen[i]);
    }
  }

  updateVoorstelling(index: number, newVoorstelling: Voorstelling) {
    const id = this.voorstellingen[index]._id;
    newVoorstelling._id = id;
    this.http.put(environment.serverUrl + '/voorstellingen/' + id, newVoorstelling , { headers: this.headers })
      .toPromise()
      .then(response => {
        this.voorstellingenChanged.next(this.voorstellingen.slice());
      })
      .catch(error => {
        return this.handleError(error);
      });

  }

  deleteVoorstelling(index: number) {
    const id = this.voorstellingen[index]._id;
    this.http.delete(environment.serverUrl + '/voorstellingen/' + id, { headers: this.headers })
      .toPromise()
      .then(response => {
        this.voorstellingen.splice(index, 1);
        this.voorstellingenChanged.next(this.voorstellingen.slice());
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}


