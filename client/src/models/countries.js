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

Countries.prototype.findByAlpha3Code = function (code) {
  return this.allCountries.find(country => country.alpha3Code === code);
};

module.exports = Countries;
