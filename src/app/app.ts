import {Component} from '@angular/core';
import {Params} from 'angular2-onsenui';
import {ActivatedRoute, RouterModule, Routes, Router } from '@angular/router';
import {Animations} from './animations';
import {SearchComponent} from '../components/SearchComponent';
import {LibraryComponent} from '../components/LibraryComponent';



@Component({
  selector: 'ons-page',
  template: `
    <ons-toolbar>
      <div class="center">Browse</div>
    </ons-toolbar>
    <div class="background"></div>
    <div class="content" class="browse-page">
      <div style="text-align: center; margin: 10px">
        <p>Browse</p>
      </div>
    </div>
`
})
export class BrowseComponent {
}

/*--------------
    ARTISTS
-------------- */
@Component({
  selector: 'ons-page',
  template: `
   <ons-toolbar>
      <div class="left"><ons-back-button><a class="button--quiet" routerLink="/home">Back</a></ons-back-button></div>
      <div class="center">Artists</div>
    </ons-toolbar>
    <div class="background"></div>
    <div class="content" class="browse-page">
    <ons-list>
        <ons-list-item tappable>
          <div class="left">
            <img class="list__item__thumbnail" src="http://img2-ak.lst.fm/i/u/2ad8c6443e194fbfcfddb06ffb08690e.png">
          </div>
          <div class="center">
            Bruno Mars
          </div>
          <div class="list__item__right">
            <ons-button class="button--quiet" (click)="onClick()"><i class="ion-more list__item__icon"></i></ons-button>
          </div>
        </ons-list-item>

        <ons-list-item tappable>
          <div class="left">
            <img class="list__item__thumbnail" src="https://yt3.ggpht.com/t0BQMWPd4TUKm6tiP01XnOAXZBGCESev5yop7dj6xvIyVtbaRWHyd0LaqFgWL8vr9HHy28S0xVrkD-PR=s900-nd-c-c0xffffffff-rj-k-no">
          </div>
          <div class="center">
            Childish Gambino
          </div>
          <div class="list__item__right">
            <ons-button class="button--quiet" (click)="onClick()"><i class="ion-more list__item__icon"></i></ons-button>
          </div>
        </ons-list-item>

        <ons-list-item tappable>
          <div class="left">
            <img class="list__item__thumbnail" src="http://www.rap-up.com/wp-content/uploads/2015/09/drake-fader-2.jpg">
          </div>
          <div class="center">
            Drake
          </div>
          <div class="list__item__right">
            <ons-button class="button--quiet" (click)="onClick()"><i class="ion-more list__item__icon"></i></ons-button>
          </div>
        </ons-list-item>

        <ons-list-item tappable>
          <div class="left">
            <img class="list__item__thumbnail" src="https://yt3.ggpht.com/-APsbUMwis70/AAAAAAAAAAI/AAAAAAAAAAA/619A7af1k1g/s900-c-k-no-mo-rj-c0xffffff/photo.jpg">
          </div>
          <div class="center">
            Post Malone
          </div>
          <div class="list__item__right">
            <ons-button class="button--quiet" (click)="onClick()"><i class="ion-more list__item__icon"></i></ons-button>
          </div>
        </ons-list-item>

        <ons-list-item tappable>
          <div class="left">
            <img class="list__item__thumbnail" src="http://pre-party.com.ua/thumbnails/0f/0f2ae7ace69f242618b0b9bfa94ea07d.jpg">
          </div>
          <div class="center">
            The Weeknd
          </div>
          <div class="list__item__right">
            <ons-button class="button--quiet" (click)="onClick()"><i class="ion-more list__item__icon"></i></ons-button>
          </div>
        </ons-list-item>  

        
    </ons-list>
    </div>
  
  `,
  styles: [':host { width: 100%; display: block; position: absolute; }'],
  host: { '[@routeAnimation]': 'true' },
  animations: Animations.page
})
export class ArtistComponent {

  constructor(public route: ActivatedRoute){}

}



@Component({
  selector: 'app',
  template: `

  <ons-tabbar>
    <div class="tab-bar__content"></div>
    <div class="tab-bar">
      <ons-tab ui-sref="navigator.master" label="Library" icon="ion-ios-musical-notes" [page]="library" active > </ons-tab>
      <ons-tab label="Browse" icon="ion-ios-browsers" [page]="browse" ></ons-tab>
      <ons-tab label="Search" icon="ion-ios-search" [page]="search"  ></ons-tab>
    </div>
  </ons-tabbar>
`
})
export class AppComponent {
  library = LibraryComponent;
  browse = BrowseComponent;
  search = SearchComponent;

  constructor(){

  }
}