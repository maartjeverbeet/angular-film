import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {VoorstellingListService} from '../voorstelling-list.service';
import {Voorstelling} from '../../shared/voorstelling.model';

@Component({
  selector: 'app-voorstelling-list-edit',
  templateUrl: './voorstelling-list-edit.component.html',
  styleUrls: ['./voorstelling-list-edit.component.css']
})
export class VoorstellingListEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('timeInput') timeInputRef: ElementRef;

  constructor(private vService: VoorstellingListService) { }

  ngOnInit() {
  }

  onAddItem() {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingTime = this.timeInputRef.nativeElement.value;
    const newVoorstelling = new Voorstelling(ingName, ingTime);
    this.vService.addVoorstelling(newVoorstelling);
  }

}
