const Request = require('../helpers/request.js');


const Schedule = function(schedule){
  this.startDate = schedule.startDate;
  this.endDate = schedule.endDate;
  this.countryID = schedule.countryID;
}

Schedule.prototype.getCountryInfo = function (onComplete) {
  const toVisitCountryRequest = new Request(`http://localhost:3000/tovisit/${this.countryID}`);
   toVisitCountryRequest.get((toVisitCountry) => {
     this.country = toVisitCountry;
     onComplete();
   });
};
module.exports = Schedule;
