import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {VoorstellingListService} from '../voorstelling.service';
import {Voorstelling} from '../../shared/voorstelling.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-voorstelling-list',
  templateUrl: './voorstelling-list.component.html',
  styleUrls: ['./voorstelling-list.component.css']
})
export class VoorstellingListComponent implements OnInit, OnDestroy {
  voorstellingen: Voorstelling[];
  subscription: Subscription;

  constructor(private vService: VoorstellingListService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.vService.voorstellingenChanged
      .subscribe(
        (voorstellingen: Voorstelling[]) => {
          this.vService.getVoorstellingen()
            .then(res => {
              this.voorstellingen = res;
            });
        }
      );
    this.vService.getVoorstellingen()
      .then(voorstellingen => this.voorstellingen = voorstellingen)
      .catch(error => console.log(error));
  }

  onNewVoorstelling() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
