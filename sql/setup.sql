DROP TABLE IF EXISTS artists CASCADE;
DROP TABLE IF EXISTS albums CASCADE;
DROP TABLE IF EXISTS arists_albums;

CREATE TABLE artists (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  artist TEXT NOT NULL
);

CREATE TABLE albums (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  album TEXT NOT NULL
);

CREATE TABLE arists_albums (
  artist_id BIGINT references artists(id),
  album_id BIGINT references albums(id),
  PRIMARY KEY(artist_id, album_id)
);