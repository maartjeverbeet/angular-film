import {Routes, RouterModule} from '@angular/router';
import {FilmsComponent} from './films/films.component';
import {FilmStartComponent} from './films/film-start/film-start.component';
import {FilmEditComponent} from './films/film-edit/film-edit.component';
import {FilmDetailComponent} from './films/film-detail/film-detail.component';
import {NgModule} from '@angular/core';
import {VoorstellingListComponent} from './voorstelling/voorstelling-list/voorstelling-list.component';
import {ZalenComponent} from './zalen/zalen.component';
import {VoorstellingStartComponent} from './voorstelling/voorstelling-start/voorstelling-start.component';
import {VoorstellingDetailComponent} from './voorstelling/voorstelling-detail/voorstelling-detail.component';
import {VoorstellingListEditComponent} from './voorstelling/voorstelling-list-edit/voorstelling-list-edit.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/films', pathMatch: 'full' },
  { path: 'films', component: FilmsComponent, children: [
    {path: '', component: FilmStartComponent},
    {path: 'new', component: FilmEditComponent},
    {path: ':id', component: FilmDetailComponent},
    {path: ':id/edit', component: FilmEditComponent}
  ] },
  { path: 'voorstellingen', component: VoorstellingListComponent, children: [
    {path: '', component: VoorstellingStartComponent, pathMatch: 'full'},
    {path: 'new', component: VoorstellingListEditComponent},
    {path: ':id', component: VoorstellingDetailComponent, pathMatch: 'full'},
    {path: ':id/edit', component: VoorstellingListEditComponent}
  ]},
  { path: 'zalen', component: ZalenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
