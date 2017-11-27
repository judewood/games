import { JigsawComponent } from './games/jigsaw/jigsaw.component';
import { NavAccordianComponent } from './nav-accordian/nav-accordian.component';
import { GamesModule } from './games/games.module';
import { PageNotFoundComponent } from './PageNotFound/pagenotfound.component';
import { MastermindComponent } from './games/mastermind/mastermind.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';

const appRoutes: Routes = [
  { path: 'games/mastermind', component: MastermindComponent },
  { path: 'games/jigsaw', component: JigsawComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavAccordianComponent,
    PageNotFoundComponent,
    ],
  imports: [
    BrowserModule,
    CommonModule ,
    GamesModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
