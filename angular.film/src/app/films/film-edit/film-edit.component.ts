import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FilmService} from '../film.service';

@Component({
  selector: 'app-film-edit',
  templateUrl: './film-edit.component.html',
  styleUrls: ['./film-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FilmEditComponent implements OnInit {
  id: number;
  editMode = false;

  constructor(private filmService: FilmService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          console.log(this.editMode);
        }
      );
  }

}
