const express =  require('express');
const app = express();
app.use(express.json());

const Artist = require('./models/artist');
const Album = require('./models/album');


app.post('/api/v1/artists', (req, res, next) => {
  const artist = req.body;

  Artist
    .insert(artist)
    .then(artist => res.send(artist))
    .catch(next);
});

app.get('/api/v1/artists/:id', (req, res, next) => {
  const id = req.params.id;

  Artist
    .findById(id)
    .then(artist => res.send(artist))
    .catch(next);
});

app.get('/api/v1/artists', (req, res, next) => {
  Artist
    .find()
    .then(artist => res.send(artist))
    .catch(next);
});

app.put('/api/v1/artists/:id', (req, res, next) => {
  const id = req.params.id;
  const artist = req.body;

  Artist
    .update(id, artist)
    .then(artist => res.send(artist))
    .catch(next);
});

app.delete('/api/v1/artists/:id', (req, res, next) => {
  const id = req.params.id;

  Artist
    .delete(id)
    .then(artist => res.send(artist))
    .catch(next);
});



app.post('/api/v1/albums', (req, res, next) => {
  const album = req.body;

  Album
    .insert(album)
    .then(album => res.send(album))
    .catch(next);
});

app.get('/api/v1/albums/:id', (req, res, next) => {
  const id = req.params.id;

  Album
    .findById(id)
    .then(album => res.send(album))
    .catch(next);
});

app.get('/api/v1/albums', (req, res, next) => {
  Album
    .find()
    .then(album => res.send(album))
    .catch(next);
});

app.put('/api/v1/albums/:id', (req, res, next) => {
  const id = req.params.id;
  const album = req.body;

  Album
    .update(id, album)
    .then(album => res.send(album))
    .catch(next);
});

app.delete('/api/v1/albums/:id', (req, res, next) => {
  const id = req.params.id;

  Album
    .delete(id)
    .then(album => res.send(album))
    .catch(next);
});





module.exports = app;
