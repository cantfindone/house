var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code

console.log('Start')
console.time('connection');

MongoClient.connect("mongodb://localhost:27017/www?", function (err, db) {
    console.log('connected')
    console.log(db)
    console.timeEnd('connection'); db.close();
}
);