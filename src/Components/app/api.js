const DEVELOPER_ID = import.meta.env.VITE_SPOTIFY_USER_ID;
const USER_ID = "12151823656";

class SpotifyAPI {
  baseURL = 'https://api.spotify.com/v1';

  async getTracksByArtist(artist) {
    const response = await fetch(
      `${this.baseURL}/search?q=${artist}&type=track`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      }
    );
    return await response.json();
  }

  async createPlaylist(name) {
    if (!this.accessToken) await this.updateAccessToken();
    const response = await fetch(
      `${this.baseURL}/users/${USER_ID}/playlists`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
      }
    );
    return await response.json();
  }

  async redirectToSpotifyLogin() {
    const scopes = [
      'user-read-private',
      'user-read-email',
      'playlist-modify-public',
      'playlist-modify-private'
    ];
    const redirectURI = 'http://localhost:5173/callback';
    const url = `https://accounts.spotify.com/authorize?client_id=${DEVELOPER_ID}&response_type=token&redirect_uri=${redirectURI}&scope=${scopes.join('%20')}`;
    window.location.href = url;
  }

  async saveAccessToken() {
    const url = new URL(window.location.href);
    if(url.pathname !== '/callback') return;
    const accessToken = url.hash.split('&')[0].split('=')[1];
    if (!accessToken) throw new Error('Failed to get access token');
    window.localStorage.setItem('accessToken', accessToken);
    window.location.href = '/';
  }

  wasRedirected() {
    const url = new URL(window.location.href);
    return url.pathname === '/callback';
  }

  isLoggedIn() {
    return typeof this.accessToken === 'string'; 
  }

  get accessToken() {
    return window.localStorage.getItem('accessToken');
  }
}

const singleton = new SpotifyAPI();

window.SpotifyAPI = singleton;
export { singleton as SpotifyAPI };
