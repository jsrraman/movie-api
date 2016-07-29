exports.seed = function(knex, Promise) {
  var tblName = 'rating';

  var rows = [
    { name: 'G' },
    { name: 'PG' },
    { name: 'PG-13' },
    { name: 'R' }
  ];

  return knex(tblName)
    .del()  // Remove all rows from table
    .then(function() {
      return knex.insert(rows).into(tblName); // Insert new rows
    });
};
