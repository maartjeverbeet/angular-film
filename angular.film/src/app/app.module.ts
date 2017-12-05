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


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FilmsComponent,
    FilmListComponent,
    FilmDetailComponent,
    FilmEditComponent,
    FilmStartComponent,
    FilmItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [FilmService],
  bootstrap: [AppComponent]
})
export class AppModule { }
