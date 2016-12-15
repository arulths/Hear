// Onsen UI Styling and Icons
require('onsenui/stylus/blue-basic-theme.styl');
require('onsenui/css/onsenui.css');

// Application code starts here
import {enableProdMode, NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {HttpModule} from '@angular/http';
import {OnsenModule, OnsNavigator, Params} from 'angular2-onsenui';
import {RouterModule, Routes } from '@angular/router';
import {APP_BASE_HREF,  LocationStrategy,
  HashLocationStrategy,} from '@angular/common';
import {Animations} from './app/animations';


import {AppComponent, BrowseComponent, 
    ArtistComponent} from './app/app';
import {LibraryComponent} from './components/LibraryComponent';   
import {SearchComponent} from './components/SearchComponent';
import {TrackComponent} from './components/TrackComponent';
import {PlaylistComponent} from './components/PlaylistComponent';
import {PlaylistInfoComponent} from './components/PlaylistInfoComponent';
import {SongComponent} from './components/SongComponent';
import {AlbumComponent} from './components/AlbumComponent';
import {AlbumInfoComponent} from './components/AlbumInfoComponent';
import {SPOTIFY_PROVIDERS} from './services/SpotifyServices';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'artist', component: ArtistComponent},
  { path: 'browse', component: BrowseComponent },
  { path: 'search', component: SearchComponent },
  { path: 'home', component: LibraryComponent},
  { path: 'playlist', component: PlaylistComponent },
  { path: 'album', component: AlbumComponent },
  { path: 'song', component: SongComponent },
  { path: 'tracks/:id', component: TrackComponent },
  { path: 'playlistinfo/:id', component: PlaylistInfoComponent },
  { path: 'albuminfo/:id/:name', component: AlbumInfoComponent }
];


// Enable production mode when in production mode.
if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}

@NgModule({
    imports: [
        BrowserModule,
        OnsenModule,
        HttpModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        AppComponent, 
        LibraryComponent, 
        BrowseComponent, 
        SearchComponent,
        ArtistComponent,
        PlaylistComponent,
        AlbumComponent, 
        SongComponent,
        TrackComponent,
        PlaylistInfoComponent,
        AlbumInfoComponent
    ],
    bootstrap: [
        AppComponent,
    ],
    entryComponents: [
        LibraryComponent, 
        BrowseComponent, 
        SearchComponent,
        ArtistComponent,
        PlaylistComponent,
        AlbumComponent, 
        SongComponent,
        TrackComponent,
        PlaylistInfoComponent,
        AlbumInfoComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
    ],
    providers: [{provide: APP_BASE_HREF, useValue: '/'}, Animations, SPOTIFY_PROVIDERS, {provide: LocationStrategy, useClass: HashLocationStrategy}]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule)
.catch(err => console.error(err));
