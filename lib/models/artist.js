const pool = require('../utils/pool');

module.exports = class Artist {
  id;
  artist;

  constructor({ id, artist }) {
    this.id = id;
    this.artist = artist;
  }

  static async insert({ artist, albums = [] }) {

  }

  static async findById(id) {

  }

  static async find() {

  }

  static async update(id, { artist }) {
    
  }

  static async delete(id) {

  }
};
