require('dotenv').config({path: '.env'});
const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();
const axios = require('axios');


describe('Access to DB', function(){
    it('should connect to database', function(done){
        const mysql = require('mysql');
        const Sequelize = require('sequelize');
        const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
            host: process.env.DB_HOST,
            dialect: "mysql"
        });
        db.authenticate()
        .then(() => {
            done();
        }).catch(err => {
            done(err);
        });
    });
 });

describe('Get Request - Movies Api', function(){
    it('should return movies array', function(done){
        axios.get('http://localhost:3000/movies')
        .then((response) => {
            done();
        })
        .catch((err) => done(err));
    });

    it('should return 0 element array', function(){
        return axios.get('http://localhost:3000/movies?limit=0')
        .then((response) => {
            (response.data).should.have.length(0);
        });
    });
});

describe('Get Request - Comments Api', function(){
    it('should return 0 element array', function(){
        return axios.get('http://localhost:3000/comments?limit=0')
        .then((response) => {
            (response.data).should.have.length(0);
        });
    });
});

describe('Get Request - Pages', function(){
    it('should return "Simple Movie Api"', function(){
        return axios.get('http://localhost:3000/')
        .then((response) => {
            (response.data).should.equal("Simple Movie Api");
        });
    });
});
