const https = require('https');
const http = require('http')
const querystring = require('querystring');

const express = require('express')
const app = express();

const getToken = (req, res) => {
  const postData = querystring.stringify({
    client_secret: 'e1c5d700def04cb09c0f77cc0f5e2dc4',
    client_id: 'b58f22092e524a57a572d6a7d7239d8b',
    grant_type: 'client_credentials'
  });

  const postOptions = {
      host: 'accounts.spotify.com',
      port: '443',
      path: '/api/token',
      method: 'POST',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded'
      }
  };

  const postReq = https.request(postOptions, function(spotifyResponse) {
      spotifyResponse.setEncoding('utf8');
      spotifyResponse.on('data', function (chunk) {
        res.send(JSON.parse(chunk).access_token);
      });

      spotifyResponse.on('error', function(err) {
        console.log('Error: ' + err);
      });
  });

  postReq.write(postData);
  postReq.end();
};

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
app.get('/token', getToken);

app.listen(8000, () => console.log(`Example app listening on port 8000!`));
