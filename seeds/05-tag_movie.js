exports.seed = function(knex, Promise) {
  var tblName = 'tag_movie';

  var rows = [
    { tag_id: 1, movie_id: 1 },
    { tag_id: 2, movie_id: 2 },
    { tag_id: 3, movie_id: 3 }
  ];

  return knex(tblName)
    .del()  // Remove all rows from table
    .then(function() {
      return knex.insert(rows).into(tblName); // Insert new rows
    });
};
