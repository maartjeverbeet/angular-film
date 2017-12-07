import {Routes, RouterModule} from '@angular/router';
import {FilmsComponent} from './films/films.component';
import {FilmStartComponent} from './films/film-start/film-start.component';
import {FilmEditComponent} from './films/film-edit/film-edit.component';
import {FilmDetailComponent} from './films/film-detail/film-detail.component';
import {NgModule} from '@angular/core';
import {VoorstellingListComponent} from './voorstelling-list/voorstelling-list.component';
import {ZalenComponent} from './zalen/zalen.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/films', pathMatch: 'full' },
  { path: 'films', component: FilmsComponent, children: [
    {path: '', component: FilmStartComponent},
    {path: ':id', component: FilmDetailComponent},
    {path: ':id/edit', component: FilmEditComponent}
  ] },
  { path: 'voorstelling-list', component: VoorstellingListComponent},
  { path: 'zalen', component: ZalenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
