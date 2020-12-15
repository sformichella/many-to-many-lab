const pool = require('../utils/pool');

module.exports = class Artist {
  id;
  artist;

  constructor({ id, artist }) {
    this.id = id;
    this.artist = artist;
  }

  static async insert({ artist, albums = [] }) {
    const { rows } = await pool.query(`
      INSERT INTO artists (artist)
      VALUES ($1)
      RETURNING *
    `, [artist]);

    // await pool.query(`
    //   INSERT INTO artists_albums (artist_id, album_id)
    //   SELECT ${rows[0].id}, id FROM albums WHERE album = ANY($1::text[])
    // `, [albums]);

    return new Artist(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(`
      SELECT * FROM artists
      WHERE id = $1
    `, [id]);

    if(!rows[0]) throw new Error(`No artist with id ${id}`);

    return new Artist(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(`
      SELECT * FROM artists
    `);

    return rows.map(artist => new Artist(artist));
  }

  static async update(id, { artist }) {
    const { rows } = await pool.query(`
      UPDATE artists
      SET artist = $1
      WHERE id = $2
      RETURNING *
    `, [artist, id]);

    if(!rows[0]) throw new Error(`No artist with id ${id}`);

    return new Artist(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(`
      DELETE FROM artists
      WHERE id = $1
      RETURNING *
    `, [id]);

    if(!rows[0]) throw new Error(`No artist with id ${id}`);

    return new Artist(rows[0]);
  }
};
