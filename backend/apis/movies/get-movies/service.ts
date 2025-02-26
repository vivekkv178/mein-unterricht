import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import executeQuery from "../../../utils/execute-query";
import { getAllMoviesCountQuery, getAllMoviesQuery } from "./query";

const getMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const startRow = Number(req.query.startRow) || 0;
    const endRow = Number(req.query.endRow) || 10;
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
    console.log(error);
    next(createError(500, "An error occurred while fetching movies."));
  }
};

export default getMovies;
