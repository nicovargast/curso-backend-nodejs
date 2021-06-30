const express = require('express');
const MoviesService = require('../services/movies');

const {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema,
} = require('../utils/schemas/movies');

const validationHandler = require('../utils/middleware/validationHandler');

function moviesApi(app) {
  const router = express.Router();
  app.use('/api/movies', router);

  const moviesService = new MoviesService();

  router.get('/', async function (req, res, next) {
    const { tags } = req.query;

    try {
      const movies = await moviesService.getMovies({ tags });

      res.status(200).json({
        data: movies,
        message: 'movies listed',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    async function (req, res, next) {
      const { movieId } = req.params;

      try {
        const movies = await moviesService.getMovie({ movieId });

        res.status(200).json({
          data: movies,
          message: 'movie retrieved',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    validationHandler(createMovieSchema),
    async function (req, res, next) {
      const { body: movie } = req;

      try {
        const createMovieId = await moviesService.createMovie({ movie });

        res.status(201).json({
          data: createMovieId,
          message: 'movies created',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    validationHandler(updateMovieSchema),
    async function (req, res, next) {
      const { movieId } = req.params;
      const { body: movie } = req;

      try {
        const updatedMovieId = await moviesService.updateMovie({
          movieId,
          movie,
        });

        res.status(200).json({
          data: updatedMovieId,
          message: 'movies updated',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    async function (req, res, next) {
      const { movieId } = req.params;

      try {
        const deletedMovieId = await moviesService.deleteMovie({ movieId });

        res.status(200).json({
          data: deletedMovieId,
          message: 'movies deleted',
        });
      } catch (err) {
        next(err);
      }
    }
  );
  /*
    //reto
    // creamos nuestro metodo patch en el router de nuestro servidor recibiendo el id de la movie
    router.patch('/:movieId', async (req, res, next) => {
        // destructuramos el parametro movieID que viene de la ruta
        const { movieId } = req.params;
        // recibimos los datos que vienen de body y colocamos un alias "dataMovie"
        const { body: dataMovie } = req;
        try{
            // llamamos al servicio patchMovie para que se encargue de la lógica a implementar
            const patchMovie = await moviesService.patchMovie({ movieId, dataMovie });
            // enviamos la respuesta exitosa al servidor
            res.status(200).json({
                data: patchMovie,
                message: 'updated movie'
            });
        } catch(err) {
            // en caso de error lo capturamos error
            next(err);
        }
    });
    */
}

module.exports = moviesApi;
