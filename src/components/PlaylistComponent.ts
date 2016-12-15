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
import {Animations} from '../app/animations';

/*
 * Services
 */
import {SpotifyServices} from '../services/SpotifyServices';

@Component({
  selector: 'ons-page',
  template: `
  <ons-toolbar>
      <div class="left"><ons-back-button (click)='back()'>Back</ons-back-button></div>
      <div class="center">Your Playlists</div>
  </ons-toolbar>

  <div *ngIf="!results"> No Results </div>
  <div *ngIf="results">
    <div *ngIf="!results.length">
      You have 0 playlists. Add a new one!
    </div>
  

    <div *ngIf="results.length">
      <ons-list>
      <ons-list-header>Results</ons-list-header>
        <ons-list-item *ngFor="let t of results" modifier="chevron" tappable (click)="getTrackList(t.id)">
          <div class="left">
            <ons-icon icon="fa-book"></ons-icon>
          </div>
          <div class="center">
            {{ t.name }}
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
export class PlaylistComponent implements OnInit {
    results: Object;

    constructor(private spotify: SpotifyServices,
              private router: Router,
              private route: ActivatedRoute) {}

    ngOnInit(): void {
    this.getTracklist();
  }

  getTracklist(){
      this.spotify.getUserPlaylists('4hc3_tester').subscribe((res) => {this.renderResults(res)});
  }

    back(){
    this.router.navigate(['/home']);
  }

  getTrackList(id: string){
      this.router.navigate(['/playlistinfo', id]);
  }

  renderResults(res: any): void{
      this.results = res.items;
  }

}