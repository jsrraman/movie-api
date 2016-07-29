'use strict';

var Promise = require('bluebird');
var db = require('../../../config/db');
var _ = require('lodash');
var dbUtil = require('../../util/db');

// All functions returns a bluebird promise for thier results
module.exports = {
  // Get director name given a movie id
  getDirectorName: function(movieId) {
    return db('movie as m')
      .join('person as p', 'm.director_id', 'p.id').debug(true)
      .select('name')
      .where('m.id', movieId)
      .then()
  },

  add: function(movie) {
    // Pull actors/tags arrays from the movie graph
    var actors = movie.actors;
    var tags = movie.tags;

    delete movie.actors;
    delete movie.tags;

    // Ensure there is no ID present in the movie, we want the DB to assign a new one
    delete movie.id;

    // As we want to insert a movie and its associated many to many relationships as a single unit of work, use
    // transaction to achieve the same
    return db.transaction(function(trx) {
      return trx
        .insert(movie, 'id').into('movie')  // Insert movie
        .then(function(ids) {
          console.log('Add Movie: Step 1: ', ids);

          // ids array (first element) will contain the newly inserted movie id
          movie.id = ids[0];

          // Satisfy many to many relationships for actor_movie, tag_movie
          actors = dbUtil.uidToManyToMany('person_id', actors, 'movie_id', ids[0]);
          tags = dbUtil.uidToManyToMany('tag_id', tags, 'movie_id', ids[0]);

          return trx.insert(actors).into('actor_movie'); // Insert actors
        })
        .then(function() {
          return trx.insert(tags).into('tag_movie'); // Insert tags
        })
        .then(function() {
          return movie.id; // Return movie id
        })
    })
  },

  get: function(movieID) {
    var p1 = this._get(movieID);
    var p2 = this.getActorsForMovie(movieID);
    var p3 = this.getTagsForMovie(movieID);

    return Promise.all([p1, p2, p3])
      .then()
  },

  getActorsForMovie: function(movieID) {
    return db('person as p')
      .join('actor_movie as am', 'p.id', 'am.person_id')
      .select('name')
      .where('movie_id', movieID)
      .then()
  },

  getTagsForMovie: function(movieID) {
    return db('tag as t')
      .join('tag_movie as tm', 't.id', 'tm.tag_id')
      .select('name')
      .where('movie_id', movieID)
      .then()
  },

  _get: function(movieID) {
    return db('movie')
      .select('title', 'overview', 'release_year', 'score', 'runtime', 'last_played_date')
      .where('id', movieID)
      .then()
  }
}