const Sequelize = require('sequelize');
const db = require('../config/dbConnection');

const Movie = db.define('movies', {
    title: Sequelize.STRING,
    year: Sequelize.INTEGER,
    rated: Sequelize.STRING,
    runtime: Sequelize.STRING,
    imdbid: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });
  
module.exports = Movie;
