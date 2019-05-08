const axios = require('axios');
const {check, validationResult} = require('express-validator/check');
const Movie = require('../models/Movie')


// add movie to database
module.exports.create = (req, res, next) => {
  if(req.body.imdbid) {
    axios.get(`http://www.omdbapi.com/?apikey=${process.env.API_OMDB}&i=${req.body.imdbid}`)
    .then(response => {
      let moviesDBfields = [`Title`,`Year`,`Rated`,`Runtime`,`imdbID`];

      moviesDBfields.forEach(function(value, key) {
        if(!req.body[value.toLowerCase()]) {
          req.body[moviesDBfields[key].toLowerCase()] = response.data[value];
        }
      });
      Movie.create(req.body, {
        fields: ['title','year','rated','runtime','imdbid']
      }).then((insertedMovie)=> {
        res.send(insertedMovie.dataValues);
      }).catch((err) => console.log(err));
    }).catch((err) => console.log(err));
  } else {
    Movie.create(req.body, {
      fields: ['title','year','rated','runtime','imdbid']
    }).then((insertedMovie)=> {
      res.send(insertedMovie.dataValues);
    }).catch((err) => {
      console.log(err);
      res.send(err);
    });
  }
};

exports.validate = [
  check('title').trim().isLength({min: 1}).withMessage('title is required.'),
  check('year').trim().isLength({min: 1}).withMessage('year is required.')
];


exports.checkValidation = (req, res, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.send({
      validated: req.body,
      errors: errors.mapped()
    });
  }
  next();
}

// get request - movies
exports.getRequest = (req, res, next) => {
  req.query.limit = (req.query.limit && !isNaN(req.query.limit)) ? req.query.limit : 10; 
  const whereObject = {};
  for (let key of Object.keys(req.query)) {
    whereObject[key] = req.query[key];
  }
  if(whereObject.limit) {
    delete whereObject["limit"];
  }
  Movie.findAll({
    limit: parseInt(req.query.limit),
    where: whereObject
  })
  .then(movies => {
    console.log(movies);
    res.send(movies);
  })
  .catch(err => console.log(err))
};

 