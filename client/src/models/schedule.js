const Request = require('../helpers/request.js');


const Schedule = function(schedule){
  this.startDate = new Date(schedule.startDate);
  this.endDate = new Date(schedule.endDate);
  this.countryID = schedule.countryID;
  this.country = schedule.country;
  this.id = schedule._id;
  this.note = null;
}

Schedule.prototype.getCountryInfo = function (onComplete) {
  const toVisitCountryRequest = new Request(`http://localhost:3000/tovisit/${this.countryID}`);
   toVisitCountryRequest.get((toVisitCountry) => {
     this.country = toVisitCountry;
     onComplete();
   });
};


module.exports = Schedule;
