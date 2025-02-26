export const getAllMoviesQuery = `
      SELECT imdb_id, title, director, plot, year, poster_url
      FROM movies
      LIMIT $1 OFFSET $2;
`;

export const getAllMoviesCountQuery = `
SELECT COUNT(*) FROM movies;
`;
