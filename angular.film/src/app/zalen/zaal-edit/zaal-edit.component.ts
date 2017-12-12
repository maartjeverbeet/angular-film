import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ZaalService} from '../zaal.service';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Zaal} from '../../shared/zaal.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-zaal-edit',
  templateUrl: './zaal-edit.component.html',
  styleUrls: ['./zaal-edit.component.css']
})
export class ZaalEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Zaal;

  constructor(private zaalService: ZaalService) { }

  ngOnInit() {
    this.subscription = this.zaalService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.zaalService.getZaal(index);
          this.slForm.setValue({
            zaal: this.editedItem.zaal
          });
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newZaal = new Zaal(value.zaal);
    if (this.editMode) {
      this.zaalService.updateZaal(this.editedItemIndex, newZaal);
    } else {
      this.zaalService.addZaal(newZaal);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.zaalService.deleteZaal(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
