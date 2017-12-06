import {Component, OnDestroy, OnInit} from '@angular/core';
import {Voorstelling} from '../shared/voorstelling.model';
import {Subscription} from 'rxjs/Subscription';
import {VoorstellingListService} from './voorstelling-list.service';

@Component({
  selector: 'app-voorstelling-list',
  templateUrl: './voorstelling-list.component.html',
  styleUrls: ['./voorstelling-list.component.css']
})
export class VoorstellingListComponent implements OnInit, OnDestroy {
  voorstellingen: Voorstelling[];
  private subscription: Subscription;

  constructor(private vService: VoorstellingListService) { }

  ngOnInit() {
    this.voorstellingen = this.vService.getVoorstellingen();
    this.subscription = this.vService.voorstellingenChanged
      .subscribe(
        (voorstellingen: Voorstelling[]) => {
          this.voorstellingen = voorstellingen;
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
