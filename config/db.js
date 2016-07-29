'use strict';

var config = require('../knexfile')
var knex = require('knex')(config.production);

module.exports = knex