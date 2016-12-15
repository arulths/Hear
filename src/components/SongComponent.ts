/*
 * Angular
 */
import {Component, OnInit} from '@angular/core';
import {
  Router,
  Routes,
  RouterModule,
  ActivatedRoute,
} from '@angular/router';
import{AppComponent} from '../app/app';
import {Location} from '@angular/common';
import {Animations} from '../app/animations';



/*
 * Services
 */
import {SpotifyServices} from '../services/SpotifyServices';

@Component({
  selector: 'ons-page',
  template: `
  <ons-toolbar>
      <div class="left"><button class="button--quiet" (click)='back()'>Back</button></div>
      <div class="center">Songs</div>
  </ons-toolbar>

  <div *ngIf="results">
    <div *ngIf="!results.length">
     You don't have any saved songs! Add music now. 
    </div>

    <div *ngIf="results.length">
      <ons-list>
      <ons-list-header>Songs</ons-list-header>
        <ons-list-item *ngFor="let t of results" modifier="chevron" tappable (click)="getTrack(t.track.id)">
          <div class="left">
            <img class="list__item__thumbnail" src="{{ t.track.album.images[0].url }}">
          </div>
          <div class="center">
            <span class="list__item__title">{{ t.track.name }}</span>
            <span class="list__item__subtitle">{{ t.track.artists[0].name }}</span>
          </div>
        </ons-list-item>
      </ons-list>
    </div>
  </div> 

`,
  styles: [':host { width: 100%; display: block; position: absolute; }'],
  host: { '[@routeAnimation]': 'true' },
  animations: Animations.page
})
export class SongComponent implements OnInit {
    id: string;
    results: Object;

    constructor(private spotify: SpotifyServices,
                private router: Router,
                private route: ActivatedRoute, 
                private _location: Location) {
    }

    ngOnInit(): void {
    this.getSongs();
  }

  getSongs(){
  this.spotify.getSavedUserTracks({limit:49}).subscribe((res) => {this.renderResults(res)});
  }

    back(){
        this._location.back();
  }

  getTrack(id: string){
      this.router.navigate(['/tracks', id]);
  }


  renderResults(res: any): void{
      this.results = res.items;
  }

}