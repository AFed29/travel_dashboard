const express = require('express');
const parser = require('body-parser');
const server = express();
const createIndexRouter = require('./controllers/index_controller.js');

server.use(parser.json());
server.use(express.static('client/public'));


const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
MongoClient.connect('mongodb://localhost:27017', function(err, client) {
  if (err) {
    console.error(err);
    return;
  };
  const db = client.db('travel_dashboard');
  console.log('connected to DB');
  server.use(createIndexRouter(db));
  


  server.listen(3000, function() {
    console.log('Listening on port 3000');
  });
});
