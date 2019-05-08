const express = require('express');
const router = express.Router();

const PagesController = require('../controllers/PagesController');
const MoviesController = require('../controllers/MoviesController');
const CommentsController = require('../controllers/CommentsController');
const errorsHandler = require('../middlewares/errors');

// homepage route
router.get('/', PagesController.home);

// movies routes
router.get('/movies', MoviesController.getRequest);
router.post('/movies',
    MoviesController.validate,
    MoviesController.checkValidation,
    MoviesController.create
);

// commnets routes
router.get('/comments', CommentsController.getRequest);
router.post('/comments',
    CommentsController.validate,
    CommentsController.checkValidation,
    CommentsController.create
);


module.exports = router;