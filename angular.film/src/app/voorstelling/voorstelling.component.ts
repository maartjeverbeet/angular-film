import { Component, OnInit } from '@angular/core';
import {VoorstellingListService} from './voorstelling.service';

@Component({
  selector: 'app-voorstelling',
  templateUrl: './voorstelling.component.html',
  styleUrls: ['./voorstelling.component.css'],
  providers: [VoorstellingListService]
})
export class VoorstellingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
