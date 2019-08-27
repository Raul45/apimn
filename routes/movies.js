const express = require('express');
const MoviesService = require('../services/movies');

const {
    movieIdSchema,
    createMovieSchema,
    updateMovieSchema
} = require('../utils/schemas/movies');

const validationHandler = require('../middleware/validationHandler');

const cacheResponse = require('../utils/schemas/cacheResponse');
const {
    FIVE_MINUTES_IN_SECONDS,
    SIXTY_MINUTES_IN_SECONDS
} = require('../utils/schemas/time');

function moviesApi(app) {
    const router = express.Router();
    app.use("/api/movies", router);

    const moviesService = new MoviesService();

    router.get("/", async function (req, res, next) {
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
        const { tags } = req.query;
        try {
            const movies = await moviesService.getMovies({
                tags
            });
            throw new Error('Error getting Movies');
            res.status(200).json({
                data: movies,
                message: 'Movies Listed'
            });
        } catch (err) {
            next(err);
        }
    });
    router.get("/:movieId", validationHandler({ movieId: movieIdSchema }, 'params'), async function (req, res, next) {
        cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
        const { movieId } = req.params;
        try {
            const movies = await moviesService.getMovie({
                movieId
            });
            res.status(200).json({
                data: movies,
                message: 'Movie retrieved'
            });
        } catch (err) {
            next(err);
        }
    });
    router.post("/", validationHandler(createMovieSchema), async function (req, res, next) {
        const { body: movie } = req;
        try {
            const movies = await moviesService.createMovie({
                movie
            });
            res.status(200).json({
                data: movies,
                message: 'Movie add'
            });
        } catch (err) {
            next(err);
        }
    });
    router.put("/:movieId", validationHandler({ movieId: movieIdSchema }, 'params'), validationHandler(updateMovieSchema), async function (req, res, next) {
        const { movieId } = req.params;
        const { body: movie } = req;
        try {
            const movies = await moviesService.updateMovie({
                movieId, movie
            });
            res.status(200).json({
                data: movies,
                message: 'Movie updated'
            });
        } catch (err) {
            next(err);
        }
    });
    router.delete("/:movieId", validationHandler({ movieId: movieIdSchema }, 'params'), async function (req, res, next) {
        const { movieId } = req.params;

        try {
            const movies = await moviesService.deleteMovie({
                movieId
            });
            res.status(200).json({
                data: movies,
                message: 'Movie deleted'
            });
        } catch (err) {
            next(err);
        }
    });
}

module.exports = { moviesApi }