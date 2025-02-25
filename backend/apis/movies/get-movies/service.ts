import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import executeQuery from "../../../utils/execute-query";
import { getAllMoviesQuery } from "./query";

const getMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await executeQuery(getAllMoviesQuery);

    res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);

    next(createError(500, "An error occurred while fetching users."));
  }
};

export default getMovies;
