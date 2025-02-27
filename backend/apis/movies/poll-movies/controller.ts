import express, { Request, Response, Router } from "express";
import pollMovies from "./service";
import COMMON_CONFIG from "../../../config/common-config";

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
router.get(COMMON_CONFIG.POLL_MOVIES_ROUTE, pollMovies);

export default router;
