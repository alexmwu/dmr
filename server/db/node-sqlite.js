var fs = require("fs");
var file = "app.db";
var exists = fs.existsSync(file);

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

db.serialize(function() {
  if(!exists) {
    db.run("create table bigdata ( \ 
      id int primary key not null, \
      data text \
    )");
    db.run("create table chunks ( \
      id int primary key not null, \
      foreign key(data_id) references bigdata(id) not null, \
      chunk text text, \
      chunk_index int not null \
    )");
    db.run("create table mappers ( \
      id int primary key not null, \
      
    )");
    db.run("create table reducers ( \

    )");
    db.run("create table results ( \

    )");
    db.run("create table jobs ( \

    )");
    db.run("create table chunk_jobs ( \

    )");
});
