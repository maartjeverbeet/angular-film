import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {VoorstellingListService} from '../voorstelling-list.service';
import {Voorstelling} from '../../shared/voorstelling.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-voorstelling-list-edit',
  templateUrl: './voorstelling-list-edit.component.html',
  styleUrls: ['./voorstelling-list-edit.component.css']
})
export class VoorstellingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') vlForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Voorstelling;

  constructor(private vService: VoorstellingListService) { }

  ngOnInit() {
    this.subscription = this.vService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.vService.getVoorstelling(index);
          this.vlForm.setValue({
            name: this.editedItem.name,
            time: this.editedItem.time,
            zaal: this.editedItem.zaal
          });
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newVoorstelling = new Voorstelling(value.name, value.time, value.zaal);
    if (this.editMode) {
      this.vService.updateVoorstelling(this.editedItemIndex, newVoorstelling);
    } else {
      this.vService.addVoorstelling(newVoorstelling);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.vlForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.vService.deleteVoorstelling(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
