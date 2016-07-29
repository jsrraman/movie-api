'use strict';
var _ = require('lodash');

var prettyjson = require('prettyjson');

var dbUtil = {
	uidToManyToMany: function(sourceIdName, sourceArray, destIdName, destId) {
    return _.map(sourceArray, function(item) {
      var value = {}

      value[sourceIdName] = item;
      value[destIdName] = destId;

      return value
    });
	}
};

module.exports = dbUtil;
