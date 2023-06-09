const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

router.get('/movies/create', (req, res) => {
  Celebrity.find()
    .then(celebrities => {
      res.render('movies/new-movie.hbs', { celebrities })
    })
    .catch(err => console.log(err))
});

router.post('/movies/create', (req, res) => {
    const { title, genre, plot, cast } = req.body;
    console.log(req.body);
    Movie.create({ title, genre, plot, cast })
      .then(() => {
        res.redirect('/movies')
      })
      .catch(err => console.log(err));
  })

router.get('/movies', (req, res) =>
    Movie.find()
    .then(moviesFound => {
        console.log('movies on the database:', moviesFound)
        res.render('movies/movies.hbs', { movies: moviesFound })
    })
      .catch(err => console.log(err))
)

router.get('/movies/:id', (req, res, next) => {
    const { id } = req.params
   
    Movie.findById(id)
    .populate('cast')
    .then(movie => {
        res.render('movies/movie-details.hbs', { movie })
    })
      .catch(err => next(err))
  })

router.post('/movies/:id/delete', (req, res, next) => {
    const { id } = req.params
    Movie.findByIdAndRemove(id)
    .then(() => res.redirect('/movies'))
    .catch(err => console.log(err))
})

router.get('/movies/:id/edit', (req, res) => {
    const { id } = req.params
    Movie.findById(id)
      .then(moviesToEdit => {
        res.render('movies/edit-movie.hbs', { movie: moviesToEdit })
      })
      .catch(err => console.log(err))
  });

router.post('/movies/:id/edit', (req, res, next) => {
    const { id } = req.params
    const { title, genre, plot, cast } = req.body
   
    Movie.findByIdAndUpdate(id, { title, genre, plot, cast }, { new: true })
      .then(updatedMovie => res.redirect(`/movies/${updatedMovie.id}`))
      .catch(err => next(err))
  })
    


module.exports = router;