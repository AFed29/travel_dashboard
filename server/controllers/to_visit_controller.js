const express = require('express');
const toVisitRouter = new express.Router();


const createToVisitRouter = function(dbConnection) {
  const toVisitCountriesCollection = dbConnection.collection('to_visit_countries');

  toVisitRouter.get('/', function(req, res){
    toVisitCountriesCollection.find().toArray(function(err, toVisitCountries){
      if(err){
        console.error(err);
        res.status(500);
        res.send();
        return;
      };
      res.json(toVisitCountries);
    });
  });


toVisitRouter.post('/', function(req, res){
  const newToVisitCountry = req.body;
  toVisitCountriesCollection.save(newToVisitCountry, function(err, toVisitCountry){
    if(err){
      console.error(err);
      res.status(500);
      res.send();
      return;

    };
    console.log('Saved!');
    res.status(201);
    res.json(toVisitCountry.ops[0]);
  });
});
return toVisitRouter
}

module.exports = createToVisitRouter;
