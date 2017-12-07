import {Subject} from 'rxjs/Subject';
import {Zaal} from '../shared/zaal.model';

export class ZaalService {
  zalenChanged = new Subject<Zaal[]>();
  private zalen: Zaal[] = [
    new Zaal(1),
    new Zaal(2)
  ];

  getZalen() {
    return this.zalen.slice();
  }

  addZaal(zaal: Zaal) {
    this.zalen.push(zaal);
    this.zalenChanged.next(this.zalen.slice());
  }

  addZalen(zalen: Zaal[]) {
    this.zalen.push(...zalen);
    this.zalenChanged.next(this.zalen.slice());
  }
}
