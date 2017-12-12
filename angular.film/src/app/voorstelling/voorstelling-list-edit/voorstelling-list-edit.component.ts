import {Component, OnInit} from '@angular/core';
import {Voorstelling} from '../../shared/voorstelling.model';
import {FormArray, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {VoorstellingListService} from '../voorstelling.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-voorstelling-list-edit',
  templateUrl: './voorstelling-list-edit.component.html',
  styleUrls: ['./voorstelling-list-edit.component.css']
})
export class VoorstellingListEditComponent implements OnInit {
  id: string;
  editMode = false;
  voorstellingForm: FormGroup;
  voorstelling: Voorstelling;

  constructor(private vService: VoorstellingListService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    if (this.editMode) {
      this.vService.updateVoorstelling(this.id, this.voorstellingForm.value);
    } else {
      this.vService.addVoorstelling(this.voorstellingForm.value);
      this.vService.getVoorstellingen()
        .then(voorstellingen => {
          this.vService.voorstellingenChanged.next(voorstellingen.slice());
        });
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let editVoorstelling = new Voorstelling({name: '', time: '', zaal: ''});

    const filmVoorstellingen = new FormArray([]);

    if (this.editMode) {
      this.vService.getVoorstelling(this.id)
        .then(voorstelling => {
          editVoorstelling = voorstelling;
          if (voorstelling['voorstellingen']) {
            for (const name of voorstelling.name) {
              filmVoorstellingen.push(
                new FormGroup({
                  'name': new FormControl(name.name, Validators.required),
                  'time': new FormControl(name.time, Validators.required),
                  'zaal': new FormControl(name.zaal, Validators.required)
                })
              );
            }
          }

          this.voorstellingForm = new FormGroup({
            'name': new FormControl(editVoorstelling.name, Validators.required),
            'time': new FormControl(editVoorstelling.time, Validators.required),
            'zaal': new FormControl(editVoorstelling.zaal, Validators.required)
          });
        })
        .catch(error => console.log(error));
    }

    this.voorstellingForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'time': new FormControl('', Validators.required),
      'zaal': new FormControl('', Validators.required)
    });
  }

}
