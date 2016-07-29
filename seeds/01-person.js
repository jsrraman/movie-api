exports.seed = function(knex, Promise) {
  var tblName = 'person';

  var rows = [
    { firstname: 'Rajaraman', lastname: 'Subramanian' },
    { firstname: 'Parimala', lastname: 'Rajaraman' },
    { firstname: 'Balajee', lastname: 'Subramanian' },
  ];

  return knex(tblName)
    .del()  // Remove all rows from table
    .then(function() {
      return knex.insert(rows).into(tblName); // Insert new rows
    });
};
