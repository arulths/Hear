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
import {Location} from '@angular/common';
import{AppComponent} from '../app/app';
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
      <div class="center">{{ albumName }}</div>
  </ons-toolbar>

  <div *ngIf="!results"> No Results </div>
  <div *ngIf="results">
    <div *ngIf="!results.length">
      This album doesn't have any songs yet.
    </div>

    <div *ngIf="results.length">
      <ons-list>
        <ons-list-item *ngFor="let t of results" modifier="chevron" tappable (click)="getTrack(t.id)">
          <div class="left">
            {{ t.track_number }}
          </div>
          <span class="list__item__title">{{ t.name }}</span> 
            <span class="list__item__subtitle">{{ t.artists[0].name }}</span>
        </ons-list-item>
      </ons-list>
    </div>
  </div> 

`,
  styles: [':host { width: 100%; display: block; position: absolute; }'],
  host: { '[@routeAnimation]': 'true' },
  animations: Animations.page
})
export class AlbumInfoComponent implements OnInit {
    id: string;
    name: string;
    results: Object;

    constructor(private spotify: SpotifyServices,
                private router: Router,
                private route: ActivatedRoute, 
                private _location: Location) {
        route.params.subscribe(params => { this.id = params['id'], this.name = params['name']; });
    }

    ngOnInit(): void {
    this.getAlbums();
  }

  getAlbums(){
      this.spotify.getAlbumTracks(this.id).subscribe((res) => {this.renderResults(res);});
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