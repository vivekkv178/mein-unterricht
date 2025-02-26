import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import executeQuery from "../../../utils/execute-query";
import { getAllMoviesCountQuery, getAllMoviesQuery } from "./query";

const getMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { startRow, endRow } = req.query;

    // Convert query params to numbers with default values
    const start = parseInt(startRow as string) || 0;
    const end = parseInt(endRow as string) || 10;
    const limit = end - start;
    const offset = start;

    const movies = await executeQuery(getAllMoviesQuery, [limit, offset]);

    // Fetch total count for AG Grid
    const totalCountResult = await executeQuery(getAllMoviesCountQuery);
    const totalRecords = parseInt(totalCountResult[0].count);

    res.status(200).json({
      data: movies,
      totalRecords,
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
    next(createError(500, "An error occurred while fetching movies."));
  }
};

export default getMovies;
