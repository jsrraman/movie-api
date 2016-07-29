'use strict';

var Promise = require('bluebird');
var db = require('../../../config/db');
var _ = require('lodash');

// All functions returns a bluebird promise for thier results
module.exports = {
  // List all person names
  getPeople: function() {
    return db.select().from('person').then();
  },

  getPerson: function(searchText) {
    return db('person')
      .where('name', 'like', '%' + searchText + '%')
      .select('id', 'name as text')
      .orderBy('name')
      .then()
  },

  setPersonName: function(firstname, lastname, name) {
    return db('person')
      .where({
        firstname: firstname,
        lastname: lastname
      })
      .update({ name: name })
      .then();
  },

  setPeopleName: function() {
    var personDao = this;

    this.getPeople().then(function(results) {

      var name;

      _.forEach(results, function(item) {
        name = item.firstname + ' ' + item.lastname;

        personDao.setPersonName(item.firstname, item.lastname, name)
          .then(function(result) {
            console.log('updated->' + name)
          })
          .catch(function(error) {
            console.error(error)
          })
          .finally(function() {
            db.destroy()
          })
      })
    })
  },

  add: function(person) {
    return db('person').insert(person).then()
  }
}