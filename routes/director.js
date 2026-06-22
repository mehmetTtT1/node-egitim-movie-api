const express = require('express');
const  mongoose = require('mongoose');
const router = express.Router();
const Director = require("../models/Director");
const Movie = require("../models/Movie");


/* POST  page. */
router.post('/', async (req, res) => {
  try {
    const director = await Director.create(req.body);
    res.json(director);
  } catch (err) {
    res.json(err); }

  const director = await Director.find({});
  console.log(director);

});

//GET page
router.get('/', async (req, res) => {
  const data = await Director.aggregate([
    {
      $lookup: {
        from: 'moviews',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movies'
      }
    }
  ]);

  res.json(data);
});

// GET director_id
router.get('/:director_id', async (req, res) => {
  const data = await Director.aggregate([
    {
      $match:{
        '_id': new mongoose.Types.ObjectId(req.params.director_id)
      }

    },


    {
      $lookup: {
        from: 'moviews',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movies'
      }
    }
  ]);

  res.json(data);
});


// PUT directör

router.put('/:director_id', async (req, res, next) => {
  try {
    const director = await Director.findByIdAndUpdate(req.params.director_id,req.body,{new:true});

    if (!director) {
      return next(new Error('The director not found.'));
    }

    res.json(director);

  } catch (err) {
    res.json(err);
  }
});

//DELETE  director
router.delete('/:director_id', async (req, res, next) => {
  try {
    const director = await Director.findByIdAndDelete(req.params.director_id);

    if (!director) {
      return next(new Error('The director not found.'));
    }

    res.json(director);

  } catch (err) {
    res.json(err);
  }
});



module.exports = router;
