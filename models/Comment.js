const Sequelize = require('sequelize');
const db = require('../config/dbConnection');

const Comment = db.define('comments', {
    user_name: Sequelize.STRING,
    movie_id: Sequelize.INTEGER,
    imdbid: Sequelize.STRING,
    comment_text: Sequelize.TEXT,
    updatedAt: Sequelize.DATE,
    createdAt: Sequelize.DATE
  });
  
module.exports = Comment;
