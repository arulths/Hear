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



/*
 * Services
 */
import {SpotifyServices} from '../services/SpotifyServices';

@Component({
  selector: 'ons-page',
  template: `
  <ons-toolbar>
      <div class="left"><button class="button--quiet" (click)='back()'>Library</button></div>
      <div class="center">Search</div>
  </ons-toolbar>
  <div style="padding: 10px; padding-bottom:10px;, height: 40px;">
    <input #newquery type="search" class="search-input" placeholder="type to search..." [(value)]="query" (keydown.enter)="submit(newquery.value)">
  </div> 
  <div style="padding-left:10px; padding-right:10px;">  <button class="button button--large" (click)="submit(newquery.value)">Search</button> </div>


  <div *ngIf="results">
    <div *ngIf="!results.length">
      No tracks were found with the term '{{ query }}'
    </div>
  


    <div *ngIf="results.length">
      <ons-list>
      <ons-list-header>Results</ons-list-header>
        <ons-list-item *ngFor="let t of results" modifier="chevron" tappable>
          <div class="left">
            <img class="list__item__thumbnail" src="{{ t.album.images[0].url }}">
          </div>
          <div class="center">
            <span class="list__item__title"><a (click)="test()" [routerLink]="['/tracks', t.id]">
                    {{ t.name }}
                  </a></span><span class="list__item__subtitle">{{ t.artists[0].name }}</span>
          </div>
        </ons-list-item>
      </ons-list>
    </div>
  </div> 

`
})
export class SearchComponent implements OnInit {
  query: string;
  results: Object;
  private user: Object;

  constructor(private spotify: SpotifyServices,
              private router: Router,
              private route: ActivatedRoute) {
    this.route
      .queryParams
      .subscribe(params => { this.query = params['query'] || ''; });
  }

  ngOnInit(): void {
    this.search();
  }

  submit(query: string): void {
    this.router.navigate(['search'], { queryParams: { query: query } })
      .then(_ => this.search() );
  }

  search(): void {
    console.log('this.query', this.query);
    if (!this.query) {
      return;
    }

    this.spotify
      .searchTrack(this.query)
      .subscribe((res: any) => this.renderResults(res));
  }

  back(){
    this.router.navigate(['/home']);
  }

  login() {
        this.spotify.login().subscribe(
            token => {
                console.log(token);

                this.spotify.getCurrentUser()
                    .subscribe(data=> { console.log("getCurrentUser: ", data); this.user = data },
                    err=> console.error(err));

            },
            err => console.error(err),
            () => { });
    }

  renderResults(res: any): void {
    this.results = null;
    if (res && res.tracks && res.tracks.items) {
      this.results = res.tracks.items;
    }
  }
}
