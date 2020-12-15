const request = require('supertest');
const fileSys =  require('fs').promises;
const pool = require('../lib/utils/pool');
const app = require('../lib/app');

describe('artist routes', () => {
  it('should make a new artist and return it', async() => {
    const response = await request(app)
      .post('./api/v1/artists')
      .send({ artist: 'Gift of Gab' });

    expect(response.body).toEqual({ id: '1', artist: 'Gift of Gab' });
  });
});

describe('album routes', () => {

});
