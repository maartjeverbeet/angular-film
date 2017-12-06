import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FilmsComponent } from './films/films.component';
import { FilmListComponent } from './films/film-list/film-list.component';
import { FilmDetailComponent } from './films/film-detail/film-detail.component';
import { FilmEditComponent } from './films/film-edit/film-edit.component';
import { FilmStartComponent } from './films/film-start/film-start.component';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { FilmItemComponent } from './films/film-list/film-item/film-item.component';
import {AppRoutingModule} from './app-routing.module';
import {FilmService} from './films/film.service';
import { VoorstellingListComponent } from './voorstelling-list/voorstelling-list.component';
import { VoorstellingListEditComponent } from './voorstelling-list/voorstelling-list-edit/voorstelling-list-edit.component';
import {VoorstellingListService} from './voorstelling-list/voorstelling-list.service';
import {DropdownDirective} from './shared/dropdown.directive';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FilmsComponent,
    FilmListComponent,
    FilmDetailComponent,
    FilmEditComponent,
    FilmStartComponent,
    FilmItemComponent,
    VoorstellingListComponent,
    VoorstellingListEditComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [FilmService, VoorstellingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
