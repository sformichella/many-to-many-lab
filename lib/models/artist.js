const pool = require('../utils/pool');

module.exports = class Artist {
  id;
  artist;

  constructor({ id, artist }) {
    this.id = id;
    this.artist = artist;
  }

  static async insert({ artist }) {
    const { rows } = await pool.query(`
      INSERT INTO artists (artist)
      VALUES ($1)
      RETURNING *
    `, [artist]);

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
    `)

    return rows.map(artist => new Artist(artist));
  }

  static async update(id, { artist }) {
    
  }

  static async delete(id) {

  }
};
