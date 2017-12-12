import { Component, OnInit } from '@angular/core';
import {Voorstelling} from '../../shared/voorstelling.model';
import {VoorstellingListService} from '../voorstelling.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-voorstelling-detail',
  templateUrl: './voorstelling-detail.component.html',
  styleUrls: ['./voorstelling-detail.component.css']
})
export class VoorstellingDetailComponent implements OnInit {
  voorstelling: Voorstelling;
  id: string;

  constructor(private vService: VoorstellingListService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.vService.getVoorstelling(this.id)
            .then(voorstelling => this.voorstelling = voorstelling)
            .catch(error => console.log(error));
        }
      );
  }

  onEditVoorstelling() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteVoorstelling() {
    this.vService.deleteVoorstelling(this.id);
    this.router.navigate(['/voorstellingen']);
  }

}
