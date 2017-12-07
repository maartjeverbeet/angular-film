import {Component, OnDestroy, OnInit} from '@angular/core';
import {Zaal} from '../shared/zaal.model';
import {Subscription} from 'rxjs/Subscription';
import {ZaalService} from './zaal.service';

@Component({
  selector: 'app-zalen',
  templateUrl: './zalen.component.html',
  styleUrls: ['./zalen.component.css']
})
export class ZalenComponent implements OnInit, OnDestroy {
  zalen: Zaal[];
  private subscription: Subscription;

  constructor(private zService: ZaalService) { }

  ngOnInit() {
    this.zalen = this.zService.getZalen();
    this.subscription = this.zService.zalenChanged
      .subscribe(
        (zalen: Zaal[]) => {
          this.zalen = zalen;
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
