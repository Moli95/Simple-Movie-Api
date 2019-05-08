const {check, validationResult} = require('express-validator/check');
const Comment = require('../models/Comment')


// add comment to database
module.exports.create = (req, res, next) => {
    console.log(req.body);
    Comment.create(req.body, {
      fields: ['movie_id','user_name','imdbid','comment_text']
    }).then((insertedComment)=> {
      console.log(insertedComment.dataValues);
      res.send(insertedComment.dataValues);
    }).catch((err) => {
      res.send(err);
    });
};

exports.validate = [
  check('movie_id').trim().isLength({min: 1}).withMessage('movie_id is required.'),
  check('user_name').trim().isLength({min: 1}).withMessage('user_name is required.'),
  check('comment_text').trim().isLength({min: 1}).withMessage('Comment_text is required.')
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


// get request - comments
module.exports.getRequest = (req, res, next) => {
  req.query.limit = (req.query.limit && !isNaN(req.query.limit)) ? req.query.limit : 10; 
  const whereObject = {};
  for (let key of Object.keys(req.query)) {
    whereObject[key] = req.query[key];
  }
  if(whereObject.limit) {
    delete whereObject["limit"];
  }
  Comment.findAll({
    limit: parseInt(req.query.limit),
    where: whereObject
  })
  .then(comments => {
    console.log(comments);
    res.send(comments);
  })
  .catch(next)
};

 
