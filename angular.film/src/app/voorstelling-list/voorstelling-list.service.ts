
import {Subject} from 'rxjs/Subject';
import {Voorstelling} from '../shared/voorstelling.model';

export class VoorstellingListService {
  voorstellingenChanged = new Subject<Voorstelling[]>();
  private voorstellingen: Voorstelling[] = [
    new Voorstelling('Soof', 1200),
    new Voorstelling('Soof2', 1500)
  ];

  getVoorstellingen() {
    return this.voorstellingen.slice();
  }

  addVoorstelling(voorstelling: Voorstelling) {
    this.voorstellingen.push(voorstelling);
    this.voorstellingenChanged.next(this.voorstellingen.slice());
  }

  addVoorstellingen(voorstellingen: Voorstelling[]) {
    this.voorstellingen.push(...voorstellingen);
    this.voorstellingenChanged.next(this.voorstellingen.slice());
  }
}
