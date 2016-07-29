exports.seed = function(knex, Promise) {
  var tblName = 'tag';

  var rows = [
    { name: 'horror' },
    { name: 'comedy' },
    { name: 'action' }
  ];

  return knex(tblName)
    .del()  // Remove all rows from table
    .then(function() {
      return knex.insert(rows).into(tblName); // Insert new rows
    });
};
