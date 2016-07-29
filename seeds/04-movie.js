exports.seed = function(knex, Promise) {
  var tblName = 'movie';

  var rows = [
    { rating_id: 1, director_id: 1, title: 'Titanic', overview: 'no comments', release_year: 1998, score: 9,
      runtime: 90, last_played_date: '2016-07-19' },
    { rating_id: 2, director_id: 2, title: 'Avatar', overview: 'superb', release_year: 2012, score: 10,
      runtime: 120, last_played_date: '2016-07-20' },
    { rating_id: 3, director_id: 3, title: 'Jurassic park', overview: 'sci-fi', release_year: 1996, score: 9,
      runtime: 180, last_played_date: '2016-07-21' }
  ];

  return knex(tblName)
    .del()  // Remove all rows from table
    .then(function() {
      return knex.insert(rows).into(tblName); // Insert new rows
    });
};
