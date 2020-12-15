const request = require('supertest');
const fileSys =  require('fs').promises;
const pool = require('../lib/utils/pool');
const app = require('../lib/app');

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
});

describe('album routes', () => {

});
