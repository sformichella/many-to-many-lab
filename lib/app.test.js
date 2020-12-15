const request = require('supertest');
const fileSys =  require('fs').promises;
const pool = require('../lib/utils/pool');
const app = require('../lib/app');

const Artist = require('./models/artist');
const Album = require('./models/album');

describe('artist routes', () => {

  beforeEach(async() => {
    const setupSQL = await fileSys.readFile('./sql/setup.sql', 'utf-8');

    await pool.query(setupSQL);
  });

  it('make a new artist and return it', async() => {
    const response = await request(app)
      .post('/api/v1/artists')
      .send({ artist: 'Gift of Gab' });

    expect(response.body).toEqual({ id: '1', artist: 'Gift of Gab' });
  });

  it('finds an artist by id and returns all associated albums', async() => {
    const albumNames = [
      'Blazing Arrow', 
      'Fourth Dimensional Rocket Ships Going Up',
      'Imani Volume 1'
    ];

    await Promise.all([
      { album: albumNames[0] },
      { album: albumNames[1] },
      { album: albumNames[2] }
    ].map(album => Album.insert(album)));

    const artist = await Artist.insert({ artist: 'Gift of Gab', albums: albumNames });

    const response = await request(app)
      .get('/api/v1/artists/1');

    expect(response.body).toEqual({
      ...artist,
      albums: albumNames,
    });
  });

  it('finds all artists', async() => {
    const artists = await Promise.all([
      { artist: 'Gift of Gab' },
      { artist: 'KRS-One' },
      { artist: 'Chali 2na' }
    ].map(artist => Artist.insert(artist)));

    const response = await request(app)
      .get('/api/v1/artists');

    expect(response.body).toEqual(expect.arrayContaining(artists));
    expect(response.body.length).toEqual(artists.length);
  });

  it('updates an artist', async() => {
    const artist = await Artist.insert({ artist: 'Gift of Gab' });
    const updatedArtist = { id: '1', artist: 'GoG' };

    const response = await request(app)
      .put(`/api/v1/artists/${artist.id}`)
      .send(updatedArtist);

    expect(response.body).toEqual(updatedArtist);
  });

  it('deletes an artist', async() => {
    const artist = await Artist.insert({ artist: 'Gift of Gab' });

    const response = await request(app)
      .delete(`/api/v1/artists/${artist.id}`);

    expect(response.body).toEqual(artist);
  });
});

describe('album routes', () => {

  beforeEach(async() => {
    const setupSQL = await fileSys.readFile('./sql/setup.sql', 'utf-8');

    await pool.query(setupSQL);
  });

  afterAll(() => {
    return pool.end();
  });

  it('make a new album and return it', async() => {
    const response = await request(app)
      .post('/api/v1/albums')
      .send({ album: 'Blazing Arrow' });

    expect(response.body).toEqual({ id: '1', album: 'Blazing Arrow' });
  });

  it('finds an album by id and returns all associated artists', async() => {
    const artistNames = [
      'Gift of Gab',
      'Chali 2na',
      'David Byrne'
    ];

    await Promise.all([
      { artist: artistNames[0] },
      { artist: artistNames[1] },
      { artist: artistNames[2] }
    ].map(artist => Artist.insert(artist)));

    await Album.insert({ album: 'The Spirit of Apollo', artists: artistNames });

    const response = await request(app)
      .get('/api/v1/albums/1');

    expect(response.body.album).toEqual('The Spirit of Apollo');
    expect(response.body.id).toEqual('1');
    expect(response.body.artists).toEqual(expect.arrayContaining(artistNames));
    expect(response.body.artists.length).toEqual(artistNames.length);
  });

  it('finds all albums', async() => {
    const albums = await Promise.all([
      { album: 'Blazing Arrow' },
      { album: 'Fourth Dimensional Rocket Ships Going Up' },
      { album: 'Imani Volume 1' }
    ].map(album => Album.insert(album)));

    const response = await request(app)
      .get('/api/v1/albums');

    expect(response.body).toEqual(expect.arrayContaining(albums));
    expect(response.body.length).toEqual(albums.length);
  });

  it('updates an album', async() => {
    const album = await Album.insert({ album: 'Blazing Arrow' });
    const updatedAlbum = { id: '1', album: 'GoG' };

    const response = await request(app)
      .put(`/api/v1/albums/${album.id}`)
      .send(updatedAlbum);

    expect(response.body).toEqual(updatedAlbum);
  });

  it('deletes an album', async() => {
    const album = await Album.insert({ album: 'Blazing Arrow' });

    const response = await request(app)
      .delete(`/api/v1/albums/${album.id}`);

    expect(response.body).toEqual(album);
  });
});
