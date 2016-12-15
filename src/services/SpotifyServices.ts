import {Injectable, Component} from '@angular/core';
import {Http, Headers, Response, Request} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';


export interface SpotifyOptions {
  limit?: number,
  offset?: number,
  market?: string,
  album_type?: string,
  country?: string,
  type?: string,
  q?: string,
  timestamp?: string,
  locale?: string,
  public?: boolean,
  name?: string,
}


interface HttpRequestOptions {
  method?: string,
  url: string,
  search?: Object,
  body?: Object,
  headers?: Headers,
}


@Injectable()
export class SpotifyServices {
  static BASE_URL: string = 'https://api.spotify.com/v1';
  clientId: string = '098f0ab1673e41f189f1593169e12a65';
  redirectUri: string = 'http://localhost/callback';
  scope: string = 'user-follow-modify user-follow-read playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-library-read user-library-modify user-read-private';
  authToken?: string = 'BQB4Rg7UvIiY06_L6sDzDYCOGobYYRjEkdlPlPjjM-f-SiMcVVFuFH_l6TcG583zoaZCKZlxHaiK3SPBG6wclkd8YNcRMLjWAl6N9CUtAq72hYvafqCwlSYaVTk_vB8PGBRdwWmnqrUFNDPabS28GJNYc7c2wzpa8dfjxBgXqYqd5IN715UT-ZsuqT6h8vWV3MgAW2mEhFxvrbMoXdJs8Ff_SNZjcUBN2wDVKxnmAzx-_EsG53KLCUavTNDjMpQQGwBlbeyDxoUljbeWUZItFo75Gr09oa57AzWbv4IhE4tpA8xGFMNe';
  apiBase: string = SpotifyServices.BASE_URL;

  constructor(public http: Http) {
    
  }

  query(URL: string, params?: Array<string>): Observable<any[]> {
    let queryURL: string = `${SpotifyServices.BASE_URL}${URL}`;
    if (params) {
      queryURL = `${queryURL}?${params.join('&')}`;
    }

    return this.http.request(queryURL).map((res: any) => res.json());
  }

  search(query: string, type: string): Observable<any[]> {
    return this.query(`/search`, [
      `q=${query}`,
      `type=${type}`
    ]);
  }

  searchTrack(query: string): Observable<any[]> {
    return this.search(query, 'track');
  }

  getTrack(id: string): Observable<any[]> {
    return this.query(`/tracks/${id}`);
  }

  getArtist(id: string): Observable<any[]> {
    return this.query(`/artists/${id}`);
  }

  getSavedUserTracks(options?: SpotifyOptions) {
    return this.api({
      method: 'get',
      url: `/me/tracks`,
      headers: this.getHeaders(),
      search: options
    }).map(res => res.json());
  }

  
  getUserPlaylists(userId: string, options?: SpotifyOptions) {
    return this.api({
      method: 'get',
      url: `/users/${userId}/playlists`,
      headers: this.getHeaders(),
      search: options
    }).map((res: any) => res.json());
  }

  getPlaylistTracks(userId: string, playlistId: string, options?: SpotifyOptions) {
    return this.api({
      method: 'get',
      url: `/users/${userId}/playlists/${playlistId}/tracks`,
      headers: this.getHeaders(),
      search: options
    }).map(res => res.json());
  }


  getAlbum(id: string): Observable<any[]> {
    return this.query(`/albums/${id}`);
  }

   getAlbumTracks(album: string, options?: SpotifyOptions) {
    album = this.getIdFromUri(album);
    return this.api({
      method: 'get',
      url: `/albums/${album}/tracks`,
      search: options
    }).map((res:any) => res.json());
  }

    getSavedUserAlbums(options?: SpotifyOptions) {
    return this.api({
      method: 'get',
      url: `/me/albums`,
      headers: this.getHeaders(),
      search: options
    }).map((res:any) => res.json());
  }

    getCurrentUser() {
    return this.api({
      method: 'get',
      url: `/me`,
      headers: this.getHeaders()
    }).map(res => res.json());
  }

   login() {
    var promise = new Promise((resolve, reject) => {
      var w = 400,
        h = 500,
        left = (screen.width / 2) - (w / 2),
        top = (screen.height / 2) - (h / 2);

      var params = {
        client_id: this.clientId,
        redirect_uri: this.redirectUri,
        scope: this.scope || '',
        response_type: 'token'
      };
      var authCompleted = false;
      var authWindow = this.openDialog(
        'https://accounts.spotify.com/authorize?' + this.toQueryString(params),
        'Spotify',
        'menubar=no,location=no,resizable=yes,scrollbars=yes,status=no,width=' + w + ',height=' + h + ',top=' + top + ',left=' + left,
        () => {
          if (!authCompleted) {
            return reject('Login rejected error');
          }
        }
      );

      var storageChanged = (e) => {
        if (e.key === 'spotify-token') {
          if (authWindow) {
            authWindow.close();
          }
          authCompleted = true;

          this.authToken = e.newValue;
          window.removeEventListener('storage', storageChanged, false);

          return resolve(e.newValue);
        }
      };
      window.addEventListener('storage', storageChanged, false);
    });

    return Observable.fromPromise(promise).catch(this.handleError);
  }

    private toQueryString(obj: Object): string {
    var parts = [];
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
      }
    };
    return parts.join('&');
  };

  private openDialog(uri, name, options, cb) {
    var win = window.open(uri, name, options);
    var interval = window.setInterval(() => {
      try {
        if (!win || win.closed) {
          window.clearInterval(interval);
          cb(win);
        }
      } catch (e) { }
    }, 1000000);
    return win;
  }

  private auth(isJson?: boolean): Object {
    var auth = {
      'Authorization': 'Bearer ' + this.authToken
    };
    if (isJson) {
      auth['Content-Type'] = 'application/json';
    }
    return auth;
  }

  private getHeaders(isJson?: boolean): any {
    return new Headers(this.auth(isJson));
  }

  private getIdFromUri(uri: string) {
    return uri.indexOf('spotify:') === -1 ? uri : uri.split(':')[2];
  }

  private mountItemList(items: string | Array<string>): Array<string> {
    var itemList = Array.isArray(items) ? items : items.split(',');
    itemList.forEach((value, index) => {
      itemList[index] = this.getIdFromUri(value);
    });
    return itemList;
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

    private api(requestOptions: HttpRequestOptions) {
    return this.http.request(new Request({
      url: this.apiBase + requestOptions.url,
      method: requestOptions.method || 'get',
      search: this.toQueryString(requestOptions.search),
      body: JSON.stringify(requestOptions.body),
      headers: requestOptions.headers
    }));
  }

}
export var SPOTIFY_PROVIDERS: Array<any> = [
  {provide: SpotifyServices, useClass: SpotifyServices}
];
