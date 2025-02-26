import express, { Request, Response, Router } from "express";
import pollMovies from "./service";

const router: Router = express.Router();

/**
 * @openapi
 * /spaceseek-be/poll-movies:
 *   get:
 *     summary: Get All the movies.
 *     tags: [Open API]
 *     responses:
 *       200:
 *         description: The movies were successfully fetched.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: An error occurred while fetching the movies.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 */
router.get("/poll-movies", pollMovies);

export default router;
