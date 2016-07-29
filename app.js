'use strict';

var db = require('./config/db')
var screen = require('./src/util/screen')
var personDao = require('./src/dao/person')
var movieDao = require('./src/dao/movie')
var _ = require('lodash');

screen.clear()

// // Set people name to 'firstname lastname'
// personDao.setPeopleName()

// personDao.setPersonName('Rajaraman', 'Subramanian', 'RS').then(function(result) {
//   console.log(result)
// }).catch(function(error) {
//   console.error(error)
// }).finally(function() {
//   db.destroy()
// });

// personDao.getPerson('Raj').then(function(result) {
//   screen.write(result, 'json')
// }).catch(function(error) {
//   console.error(error)
// }).finally(function() {
//   db.destroy()
// });

// // Given a movie id get the director's name
// movieDao.getDirectorName(4).then(function(result){
//   console.log(result)
// })

// // Add a person
// var person = {
//   firstname: 'Krishnaswamy',
//   lastname: 'Subramanian',
//   name: 'K S'
// }
//
// personDao.add(person)
//   .then(function(result) {
//     console.log(result)
//   })
//   .catch(function(error) {
//     console.log(error)
//   })
//   .finally(function() {
//     db.destroy()
//   })

// // Add a new movie
// var movie = {
//   id: 0,        // New movie
//   rating_id: 4, // R
//   director_id: 4, // Krishnaswamy
//   actors: [1, 2], // Rajaraman, Parimala
//   tags: [2, 3], // Comedy, Action
//   title: 'Himalayan Adventure',
//   release_year: '2013',
//   score: 10,
//   runtime: 154,
//   last_played_date: '2016-01-01',
//   overview: 'Test overview'
// }
//
// movieDao.add(movie)
//   .then(function(result) {
//     console.log(result); // Should be successfully added movie id
//   })
//   .catch(function(error) {
//     console.error(error);
//   })
//   .finally(function() {
//     db.destroy();
//   })

// Get all the details of a movie
movieDao.get(4)
  .then(function(results) {

    var movie = results[0];

    movie.actors = results[1];
    movie.tags = results[2];

    screen.write(movie);
  })
  .catch(function(error) {
    console.error(error);
  })
  .finally(function() {
    db.destroy();
  })


