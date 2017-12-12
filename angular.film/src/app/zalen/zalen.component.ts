import {Component, OnDestroy, OnInit} from '@angular/core';
import {ZaalService} from './zaal.service';
import {Subscription} from 'rxjs/Subscription';
import {Zaal} from '../shared/zaal.model';

@Component({
  selector: 'app-zalen',
  templateUrl: './zalen.component.html',
  styleUrls: ['./zalen.component.css']
})
export class ZalenComponent implements OnInit, OnDestroy{
  zalen: Zaal[] = [];
  private subscription: Subscription;

  constructor(private zalenService: ZaalService) { }

  ngOnInit() {
    this.subscription = this.zalenService.zalenChanged
      .subscribe(
        (zalen: Zaal[]) => {
          this.zalenService.getZalen()
            .then(res => {
              this.zalen = res;
            });
        }
      );
    this.zalenService.getZalen()
      .then(zalen => this.zalen = zalen)
      .catch(error => console.log(error));
  }

  onEditZaal(index: number) {
    this.zalenService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
