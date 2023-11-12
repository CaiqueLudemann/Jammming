const REDIRECT_URL = 'http://localhost:5173/callback';
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
// const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const USER_ACCESS_TOKEN_KEY = "jammming_access_token";
const USER_DATA_KEY = "jammming_user_data";

const BASE_URLS = {
  API: 'https://api.spotify.com/v1',
  ACCOUNTS: 'https://accounts.spotify.com'
};

class SpotifyAPI {

  // Playlists -----------------------------------------------------------------

  async getTracksByArtist(artist) {
    const response = await fetch(
      `${BASE_URLS.API}/search?q=${artist}&type=track`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${this.accessToken}` }
      }
    );
    const data = await response.json();
    return data.tracks.items.map(item => ({
      id: item.id,
      uri: item.uri, 
      name: item.name, 
      album: item.album.name,
      artist: item.artists[0].name,
      image: item.album.images[1].url,
    }));
  }

  async createPlaylist(name) {
    if (!this.accessToken) await this.updateAccessToken();
    const response = await fetch(
      `${BASE_URLS.API}/users/${this.userInfo.id}/playlists`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
      }
    );
    const data = await response.json();
    return data.id;
  }

  // Authentication ------------------------------------------------------------

  authenticate() {
    if (this._wasRedirected())
      return this._saveUserSession();
    if (!this.isLoggedIn())
      return this._redirectToSpotifyLogin();
  }

  _wasRedirected() {
    const url = new URL(window.location.href);
    return url.pathname === '/callback';
  }

  async _saveUserSession() {
    const token = this._extractAccessTokenFromUrl();
    if (!token) throw new Error('Failed to get access token');
    this.accessToken = token;
    const userInfo = await this.getUserInfo();
    this.userInfo = userInfo;
    window.location.href = '/';
  }

  _extractAccessTokenFromUrl() {
    const url = new URL(window.location.href);
    return url.hash.split('&')[0].split('=')[1];
  }

  isLoggedIn() {
    return typeof this.accessToken === 'string';
  }

  async _redirectToSpotifyLogin() {
    const scopes = [
      'user-read-private',
      'user-read-email',
      'playlist-modify-public',
      'playlist-modify-private'
    ];
    window.location.href = `${BASE_URLS.ACCOUNTS}/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URL}&scope=${scopes.join('%20')}`;
  }

  // Token ---------------------------------------------------------------------

  get accessToken() {
    return window.localStorage.getItem(USER_ACCESS_TOKEN_KEY);
  }

  set accessToken(token) {
    window.localStorage.setItem(USER_ACCESS_TOKEN_KEY, token);
  }

  // User Info -----------------------------------------------------------------

  async getUserInfo() {
    if (!this.accessToken) await this.updateAccessToken();
    const response = await fetch(
      `${BASE_URLS.API}/me`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${this.accessToken}` }
      }
    );
    return await response.json();
  }

  set userInfo(data) {
    window.localStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
  }

  get userInfo() {
    return JSON.parse(window.localStorage.getItem(USER_DATA_KEY));
  }
}

const singleton = new SpotifyAPI();

window.SpotifyAPI = singleton;
export { singleton as SpotifyAPI };
