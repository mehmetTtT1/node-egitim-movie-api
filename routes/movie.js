const express = require('express');
const router = express.Router();
const Movie =require('../models/Movie');

/* GET movie listing.
router.post('/', function(req, res, next) {
 const  {title,imdb_score,category,country,year}=req.body;
 const  movie = new Movie({
   title:title,
   imdb_score:imdb_score,
   category:category,
   country:country,
   year:year
 })

  movie.save((err,data ) =>{

    if (err)
      res.json(err)

    res.json(data);

  })
  */
//POST movie
router.post('/', async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.json(movie);
  } catch (err) {
    res.json(err); }

  const movies = await Movie.find({});
  console.log(movies);

});

//GET movie
router.get('/', async (req, res, next) => {
  try {
    const data = await Movie.find({});
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});
//TOP 10
router.get('/top10', async (req, res, next) => {
  try {
    const data = await Movie.find({})
        .sort({ imdb_score: -1 })
        .limit(10);

    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

//GET movie parametreli

router.get('/:movie_id', async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movie_id);

    if (!movie) {
      return next(new Error('The movie not found.'));
    }

    res.json(movie);

  } catch (err) {
    res.json(err);
  }
});

// PUT movie
router.put('/:movie_id', async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.movie_id,req.body,{new:true});

    if (!movie) {
      return next(new Error('The movie not found.'));
    }

    res.json(movie);

  } catch (err) {
    res.json(err);
  }
});


// DELETE movie

router.delete('/:movie_id', async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.movie_id);

    if (!movie) {
      return next(new Error('The movie not found.'));
    }

    res.json(movie);

  } catch (err) {
    res.json(err);
  }
});





module.exports = router;
