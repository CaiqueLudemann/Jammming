// async updateAccessToken() {
//   if (!DEVELOPER_ID || !DEVELOPER_TOKEN) throw new Error('Missing developer ID or token');
//   const response = await fetch(
//     'https://accounts.spotify.com/api/token',
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       },
//       body: `grant_type=client_credentials&client_id=${DEVELOPER_ID}&client_secret=${DEVELOPER_TOKEN}`
//     }
//   );
//   const data = await response.json();
//   if (!data.access_token) throw new Error(`Failed to get access token. ${data.error}`);
//   this.accessToken = data.access_token;
// }