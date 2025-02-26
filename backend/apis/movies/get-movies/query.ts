export const getAllMoviesQuery = `
    SELECT * 
    FROM movies
    WHERE 
      title ILIKE $1
      AND director ILIKE $2
      AND plot ILIKE $3
    LIMIT $4 OFFSET $5;
`;

export const getAllMoviesCountQuery = `
     SELECT COUNT(*) 
    FROM movies
    WHERE 
      title ILIKE $1
      AND director ILIKE $2
      AND plot ILIKE $3;
`;
