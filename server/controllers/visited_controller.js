const express = require('express');
const visitedRouter = new express.Router();


const createVisitedRouter = function(dbConnection) {
  const visitedCountriesCollection = dbConnection.collection('visited_countries');

  visitedRouter.get('/', function(req, res){
    visitedCountriesCollection.find().toArray(function(err, visitedCountries){
      if(err){
        console.error(err);
        res.status(500);
        res.send();
        return;
      };
      res.json(visitedCountries);
    });
  });


visitedRouter.post('/', function(req, res){
  const newVisitedCountry = req.body;
  visitedCountriesCollection.save(newVisitedCountry, function(err, visitedCountry){
    if(err){
      console.error(err);
      res.status(500);
      res.send();
      return;

    };
    console.log('Saved!');
    res.status(201);
    res.json(visitedCountry.ops[0]);
  });
});

visitedRouter.delete('/', function(req, res){
  visitedCountriesCollection.deleteMany(function(err) {
    if(err){
      console.error(err);
      res.status(500);
      res.send();
      return;
    };
    console.log('Everything has gone');
    res.status(204);
    res.send();
  });
});

return visitedRouter
}

module.exports = createVisitedRouter;
