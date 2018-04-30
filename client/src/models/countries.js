const Request = require('../helpers/request.js');

const Countries = function() {
  this.allCountries = [];
  this.visitedCountries = [];
  this.toVisitCountries = [];
  this.url = 'https://restcountries.eu/rest/v2/all';
}

Countries.prototype.getData = function(onComplete) {
  const request = new Request(this.url);
  request.get((response) => {
    this.allCountries = response;
    onComplete(response);
  });
};

Countries.prototype.findIfCountryAlreadyInVisited = function (inputCountry) {
  return this.visitedCountries.some((country) => {
    return country.name === inputCountry.name;
  });
};

Countries.prototype.findIfCountryAlreadyInToVisit = function (inputCountry) {
  return this.toVisitCountries.some((country) => {
    return country.name === inputCountry.name;
  });
};

module.exports = Countries;
