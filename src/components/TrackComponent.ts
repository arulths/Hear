/*
 * Angular
 */

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
  </ons-toolbar>
  <div *ngIf="track">
  <div class="center">
    <h1 >{{ track.name }}</h1>

    
      <img src="{{ track.album.images[1].url }}">
   

    <div style="padding:10 10 10 10">
      <audio controls src="{{ track.preview_url }}"></audio>
    </div>
    </div>

    
  </div>
  `,
    styles: [':host { width: 100%; display: block; position: absolute; }'],
    host: { '[@routeAnimation]': 'true' },
    animations: Animations.page
})
export class TrackComponent implements OnInit {
  id: string;
  track: Object;

  constructor(public route: ActivatedRoute, public spotify: SpotifyServices,
              private _location: Location, public router: Router) {
    route.params.subscribe(params => { this.id = params['id']; });
  }

  ngOnInit(): void {
    this.spotify
      .getTrack(this.id)
      .subscribe((res: any) => this.renderTrack(res));
  }

  back(): void {
    this._location.back();
  }

  renderTrack(res: any): void {
    this.track = res;
  }
}
