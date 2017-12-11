import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {VoorstellingListService} from '../voorstelling-list.service';
import {Voorstelling} from '../../shared/voorstelling.model';
import {Subscription} from 'rxjs/Subscription';
import {NgForm} from '@angular/forms';
import {Film} from '../../films/film.model';

@Component({
  selector: 'app-voorstelling-list-edit',
  templateUrl: './voorstelling-list-edit.component.html',
  styleUrls: ['./voorstelling-list-edit.component.css']
})
export class VoorstellingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
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
          this.slForm.setValue({
            name: this.editedItem.name,
            time: this.editedItem.time
          });
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newVoorstelling = new Voorstelling(value.name, value.time);
    if (this.editMode) {
      this.vService.updateVoorstelling(this.editedItemIndex, newVoorstelling);
    } else {
      this.vService.addVoorstelling(newVoorstelling);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
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
