
import {Subject} from 'rxjs/Subject';
import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Voorstelling} from '../shared/voorstelling.model';
import {toPromise} from 'rxjs/operator/toPromise';

@Injectable()
export class VoorstellingListService {
  voorstellingenChanged = new Subject<Voorstelling[]>();
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private voorstellingen: Voorstelling[];

  constructor(private http: Http,
              private vService: VoorstellingListService) { }

  getVoorstellingen() {
    return this.http.get(environment.serverUrl + '/voorstellingen', { headers: this.headers })
      .toPromise()
      .then(response => {
        this.voorstellingen = response.json() as Voorstelling[];
        return response.json() as Voorstelling[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  getVoorstelling(index: string) {
    return this.http.get(environment.serverUrl + '/voorstelling/' + index, { headers: this.headers})
    .toPromise()
      .then(response => {
        return response.json() as Voorstelling;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  addVoorstelling(voorstelling: Voorstelling) {
    this.http.post(environment.serverUrl + '/voorstellingen', voorstelling , { headers: this.headers })
      .toPromise()
      .then(response => {
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

  updateVoorstelling(index: string, newVoorstelling: Voorstelling) {
    this.http.put(environment.serverUrl + '/voorstellingen/' + index, newVoorstelling , { headers: this.headers })
      .toPromise()
      .then(response => {
        this.voorstellingenChanged.next(this.voorstellingen.slice());
      })
      .catch(error => {
        return this.handleError(error);
      });

  }

  deleteVoorstelling(index: string) {
    this.http.delete(environment.serverUrl + '/voorstellingen/' + index, { headers: this.headers })
      .toPromise()
      .then(response => {
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


