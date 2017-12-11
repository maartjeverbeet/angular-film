import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FilmService} from '../film.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Film} from '../film.model';

@Component({
  selector: 'app-film-edit',
  templateUrl: './film-edit.component.html',
  styleUrls: ['./film-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FilmEditComponent implements OnInit {
  id: string;
  editMode = false;
  filmForm: FormGroup;
  film: Film;

  constructor(private filmService: FilmService,
              private router: Router,
              private route: ActivatedRoute) { }

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
      this.filmService.updateFilm(this.id, this.filmForm.value);
    } else {
      this.filmService.addFilm(this.filmForm.value);
      this.filmService.getFilms()
        .then(films => {
          this.filmService.filmsChanged.next(films.slice());
        });
    }
    this.onCancel();
  }

  onAddVoorstelling() {
    (<FormArray>this.filmForm.get('voorstellingen')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'time': new FormControl(null, Validators.required),
        'zaal': new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteVoorstelling(index: number) {
    (<FormArray>this.filmForm.get('voorstellingen')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let editfilm = new Film({name: '', description: '', imagepath: ''});

    const filmVoorstellingen = new FormArray([]);

    if (this.editMode) {
      this.filmService.getFilm(this.id)
        .then(film => {
          editfilm = film;
          if (film['films']) {
            for (const voorstelling of film.voorstellingen) {
              filmVoorstellingen.push(
                new FormGroup({
                  'name': new FormControl(voorstelling.name, Validators.required),
                  'time': new FormControl(voorstelling.time, Validators.required),
                  'zaal': new FormControl(voorstelling.zaal, Validators.required)
                })
              );
            }
          }

          this.filmForm = new FormGroup({
            'name': new FormControl(editfilm.name, Validators.required),
            'description': new FormControl(editfilm.description, Validators.required),
            'imagePath': new FormControl(editfilm.imagePath, Validators.required),
            'voorstellingen': filmVoorstellingen
          });
        })
        .catch(error => console.log(error));
    }

    this.filmForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'imagePath': new FormControl('', Validators.required),
      'voorstellingen': new FormArray([])
    });
  }

}
