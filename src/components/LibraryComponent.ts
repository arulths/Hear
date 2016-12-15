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
  <router-outlet></router-outlet>
  <div *ngIf="results">
    <div *ngIf="!results.length">
      You don't have any albums. Add one!
    </div>
  
    <div *ngIf="results.length">
      <ons-list>
      <ons-list-header>Recently Added</ons-list-header>
        <ons-list-item *ngFor="let t of results" modifier="chevron" tappable (click)="getAlbumList(t.album.id, t.album.name)">
          <div class="left">
            <img class="list__item__thumbnail" src="{{ t.album.images[0].url }}">
          </div>
          <div class="center">
            <span class="list__item__title">{{ t.album.name }}</span>
            <span class="list__item__subtitle">{{ t.album.artists[0].name }}</span>
          </div>
        </ons-list-item>
      </ons-list>
    </div>
  </div> 


    <ons-list>
    <ons-list-header> </ons-list-header>
      <ons-list-item  modifier="chevron" (click)="Advance(['/artist'])" tappable>Artists</ons-list-item>
      <ons-list-item  modifier="chevron" (click)="Advance(['/playlist'])" tappable>Playlists</ons-list-item>
      <ons-list-item  modifier="chevron" (click)="Advance(['/album'])" tappable>Albums</ons-list-item>
      <ons-list-item  modifier="chevron" (click)="Advance(['/song'])" tappable>Songs</ons-list-item>
    </ons-list>

`,
  styles: [':host { width: 100%; display: block; position: absolute; }'],
  host: { '[@routeAnimation]': 'true' },
  animations: Animations.page
})
export class LibraryComponent implements OnInit {
    results: Object;

    constructor(private spotify: SpotifyServices,
                private router: Router,
                private route: ActivatedRoute,
                private _location: Location) {}

    ngOnInit(): void {
    this.getAlbum();
  }

  Advance(path, id){
        this.router.navigate(path,id);
  }

  getAlbum(){
      this.spotify.getSavedUserAlbums({limit:4}).subscribe((res) => {this.renderResults(res);});
  }

  getAlbumList(id: string, name: string){
      this.router.navigate(['/albuminfo', id, name]);
  }

  renderResults(res: any): void{
      this.results = res.items;
  }

}