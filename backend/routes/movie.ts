import getMovies from "../apis/movies/get-movies/controller";
import pollMovies from "../apis/movies/poll-movies/controller";

const moviesControllers = [getMovies, pollMovies];

export default moviesControllers;
