import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import executeQuery from "../../../utils/execute-query";
import { getAllMoviesCountQuery, getAllMoviesQuery } from "./query";
import logger from "../../../logger";

const getMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { startRow: queryStartRow, endRow: queryEndRow } = req.query;
    const startRow = Number(queryStartRow) > 0 ? Number(queryStartRow) : 0;
    const endRow = Number(queryEndRow) > 0 ? Number(queryEndRow) : 10;
    const title = req.query.title || "";
    const director = req.query.director || "";
    const plot = req.query.plot || "";

    const movies = await executeQuery(getAllMoviesQuery, [
      `%${title}%`,
      `%${director}%`,
      `%${plot}%`,
      endRow - startRow,
      startRow,
    ]);
    const totalCountResult = await executeQuery(getAllMoviesCountQuery, [
      `%${title}%`,
      `%${director}%`,
      `%${plot}%`,
    ]);

    const totalRecords = parseInt(totalCountResult[0].count, 10);

    res.status(200).json({ data: movies, totalRecords });
  } catch (error) {
    logger.error(error, "Error in get-movies");
    next(createError(500, "An error occurred while fetching movies."));
  }
};

export default getMovies;
