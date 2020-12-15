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

  afterAll(() => {
    return pool.end();
  });

  it('make a new artist and return it', async() => {
    const response = await request(app)
      .post('/api/v1/artists')
      .send({ artist: 'Gift of Gab' });

    expect(response.body).toEqual({ id: '1', artist: 'Gift of Gab' });
  });

  it('finds an artist by id', async() => {
    const artist = await Artist.insert({ artist: 'Gift of Gab' });

    const response = await request(app)
      .get('/api/v1/artists/1');

    expect(response.body).toEqual(artist);
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

});
