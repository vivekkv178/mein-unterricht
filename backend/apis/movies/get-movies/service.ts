import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import executeQuery from "../../../utils/execute-query";
import httpClient from "../../../utils/http-client";

const getMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = "SELECT NOW();";
    const result = await executeQuery(query);

    res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);

    next(createError(500, "An error occurred while fetching users."));
  }
};

export default getMovies;
