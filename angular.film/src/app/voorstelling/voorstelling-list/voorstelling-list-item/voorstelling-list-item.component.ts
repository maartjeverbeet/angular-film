import {Component, Input, OnInit} from '@angular/core';
import {Voorstelling} from '../../../shared/voorstelling.model';

@Component({
  selector: 'app-voorstelling-list-item',
  templateUrl: './voorstelling-list-item.component.html',
  styleUrls: ['./voorstelling-list-item.component.css']
})
export class VoorstellingListItemComponent implements OnInit {
  @Input() voorstelling: Voorstelling;
  @Input() index: string;

  constructor() { }

  ngOnInit() {
    this.index = this.voorstelling._id;
  }

}
