export const insertMovieQuery = `
      INSERT INTO movies (imdb_id, title, director, plot, year, poster_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (imdb_id) DO NOTHING;
`;

export const insertErrorQuery = `
    INSERT INTO errors (type, message, page_number, movie_id)
    VALUES ($1, $2, $3, $4);
`;
