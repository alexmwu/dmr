var fs = require("fs");
var file = "app.db";
var exists = fs.existsSync(file);

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

db.serialize(function() {
  if(!exists) {
    db.run("create table data ( \ 
      id int primary key not null, \
      data text not null, \
    )");
    db.run("create table chunks ( \

    )");
    db.run("create table mappers ( \

    )");
    db.run("create table reducers ( \

    )");
    db.run("create table results ( \

    )");
});
