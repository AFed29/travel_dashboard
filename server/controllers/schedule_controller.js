const express = require('express');
const scheduleRouter = new express.Router();

const createScheduleRouter = function(dbConnection){
  const scheduleCollection = dbConnection.collection('schedule_collection');

  scheduleRouter.get('/', function(req, res){
    let today = new Date();
    today.setHours(0, 0, 0);
    today = today.toJSON();
    scheduleCollection.find({"endDate": {$gte:today}}).toArray(function(err, schedules){
      if(err){
        console.error(err);
        res.status(500);
        res.send();
        return;
      };
      const sortedSchedules = sortByDate(schedules);
      res.json(sortedSchedules);
    });
  });

  scheduleRouter.post('/', function(req, res){
    const newSchedule = req.body;
    scheduleCollection.save(newSchedule, function(err, schedule){
      if(err){
        console.error(err);
        res.status(500);
        res.send();
        return;
      };
      console.log('Saved!');
      res.status(201);
      res.json(schedule.ops[0]);
    });
  });

  scheduleRouter.delete('/', function(req, res){
    scheduleCollection.deleteMany(function(err) {
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

  return scheduleRouter;


}


const sortByDate = function(scheduleArray) {
  return scheduleArray.sort(function(schedulea, scheduleb) {
    if( schedulea.startDate < scheduleb.startDate) {
      return -1;
    }
    else if(schedulea.startDate > scheduleb.startDate) {
      return 1;
    }
    else {
      return 0;
    }
  });
}
module.exports = createScheduleRouter;
