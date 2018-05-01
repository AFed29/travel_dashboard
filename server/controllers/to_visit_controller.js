const express = require('express');
const toVisitRouter = new express.Router();
const ObjectID = require('mongodb').ObjectID;


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


  toVisitRouter.get('/:id', function(req, res){
    const id = req.params.id;
    const objectID = ObjectID(id);

    toVisitCountriesCollection.findOne({_id: objectID}, function(err, toVisitCountry){
      if(err){
        console.error(err);
        res.status(500);
        res.send();
        return;
      };
      res.json(toVisitCountry);
    })
  })


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

  toVisitRouter.delete('/', function(req, res){
    toVisitCountriesCollection.deleteMany(function(err) {
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

  toVisitRouter.delete('/:id', function(req, res){
    const id = req.params.id;
    const objectID = ObjectID(id);

    toVisitCountriesCollection.deleteOne({_id: objectID}, function(err){
      if(err){
        console.error(err);
        res.status(500);
        res.send();
        return;
      };
      console.log('One has been deleted');
      res.status(204);
      res.send();
    });
  });

  return toVisitRouter;
};

module.exports = createToVisitRouter;
