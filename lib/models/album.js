const pool = require('../utils/pool');

module.exports = class Album {
  id;
  album;

  constructor({ id, album }) {
    this.id = id;
    this.album = album;
  }

  static async insert({ album }) {
    const { rows } = await pool.query(`
      INSERT INTO albums (album)
      VALUES ($1)
      RETURNING *
    `, [album]);

    return new Album(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(`
      SELECT * FROM albums
      WHERE id = $1
    `, [id]);

    if(!rows[0]) throw new Error(`No album with id ${id}`);

    return new Album(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(`
      SELECT * FROM albums
    `);

    return rows.map(album => new Album(album));
  }

  static async update(id, { album }) {
    const { rows } = await pool.query(`
      UPDATE albums
      SET album = $1
      WHERE id = $2
      RETURNING *
    `, [album, id]);

    if(!rows[0]) throw new Error(`No album with id ${id}`);

    return new Album(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(`
      DELETE FROM albums
      WHERE id = $1
      RETURNING *
    `, [id]);

    if(!rows[0]) throw new Error(`No album with id ${id}`);

    return new Album(rows[0]);
  }
};
