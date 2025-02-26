import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import executeQuery from "../../../utils/execute-query";
import httpClient from "../../../utils/http-client";
import { ENV_CONFIG } from "../../../config/env-config";

const pollMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ message: "Movie polling started!" });
    await fetchMovies(1);
  } catch (error) {
    console.log(error);
    next(createError(500, "An error occurred while polling movies."));
  }
};

async function fetchMovies(page = 1) {
  try {
    console.log(`Fetching page ${page}...`);
    const data: any = await httpClient({
      method: "get",
      url: `${ENV_CONFIG.OMDB_API_DOMAIN}/?s=space&y=2020&type=movie&page=${page}&apikey=${ENV_CONFIG.OMDB_API_KEY}`,
    });

    if (data?.Response === "False") {
      console.log(`No movies found on page ${page}.`);
      await logError("fetch_api_error", `No movies found`, page);
      return;
    }

    await saveMoviesToDB(data.Search);

    const totalPages = Math.ceil(data.totalResults / 10);
    /**
     * @todo
     * change after test
     */
    if (page < 1) {
      await fetchMovies(page + 1);
    }
  } catch (error: any) {
    console.error(`Error fetching page ${page}:`, error);
    await logError("fetch_api_error", error.message, page);
  }
}

async function saveMoviesToDB(movies: any[]) {
  for (const movie of movies) {
    try {
      // Fetch additional details (director & plot)
      const movieDetails = await fetchMovieDetails(movie.imdbID);

      // Only proceed with DB insert if details were successfully fetched
      if (!movieDetails) {
        console.log(
          `Skipping insert for movie: ${movie.Title}, details not fetched.`
        );
        return;
      }

      const query = `
      INSERT INTO movies (imdb_id, title, director, plot, year, poster_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (imdb_id) DO NOTHING;
    `;

      await executeQuery(query, [
        movieDetails.id, // imdbID as primary key
        movieDetails.title,
        movieDetails.director,
        movieDetails.plot,
        movieDetails.year,
        movieDetails.poster_url,
      ]);

      console.log(`Inserted movie: ${movieDetails.title}`);
    } catch (error: any) {
      console.error(`Error inserting movie: ${movie.Title}`, error);

      // Check if the error is from fetchMovieDetails or the DB insert
      if (error.message === "Movie details fetch failed") {
        // This is a fetchMovieDetails error
        await logError(
          "fetch_movie_details_error",
          error.message,
          undefined,
          movie.imdbID
        );
      } else {
        // This is a DB insert error
        await logError(
          "db_insert_error",
          error.message,
          undefined,
          movie.imdbID
        );
      }
    }
  }
}

async function fetchMovieDetails(imdbID: string) {
  try {
    console.log(`Fetching details for movie: ${imdbID}`);

    const response: any = await httpClient({
      method: "get",
      url: `${ENV_CONFIG.OMDB_API_DOMAIN}/?i=${imdbID}&apikey=${ENV_CONFIG.OMDB_API_KEY}`,
    });

    return {
      id: response.imdbID, // Use imdbID as the primary key
      title: response.Title,
      director: response.Director || null,
      plot: response.Plot || null,
      year: parseInt(response.Year) || null,
      poster_url: response.Poster !== "N/A" ? response.Poster : null,
    };
  } catch (error: any) {
    console.error(`Error fetching details for ${imdbID}:`, error);

    // Insert API error into errors table
    await logError(
      "fetch_movie_details_error",
      error.message,
      undefined,
      imdbID
    );

    // Throw an error with a specific message to be caught in the saveMoviesToDB catch block
    throw new Error("Movie details fetch failed");
  }
}

async function logError(
  type: "fetch_api_error" | "fetch_movie_details_error" | "db_insert_error",
  message: string,
  page_number?: number,
  movie_id?: string
) {
  const query = `
    INSERT INTO errors (type, message, page_number, movie_id)
    VALUES ($1, $2, $3, $4);
  `;

  await executeQuery(query, [
    type,
    message,
    page_number || null,
    movie_id || null,
  ]);
}

export default pollMovies;
