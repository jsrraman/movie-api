exports.up = function(knex, Promise) {
  return knex.schema.hasTable('person').then(function(exists) {
    if (exists) {
      return knex.schema.table('person', function(tbl) {
        tbl.renameColumn('junk', 'name');
      });
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('person', function(tbl) {
    tbl.renameColumn('name', 'junk');
  });
};
