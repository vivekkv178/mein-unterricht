import express, { Router } from "express";
import getMovies from "./service";
import COMMON_CONFIG from "../../../config/common-config";

const router: Router = express.Router();

/**
 * @openapi
 * /spaceseek-be/get-movies:
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
router.get(COMMON_CONFIG.GET_MOVIES_ROUTE, getMovies);

export default router;
