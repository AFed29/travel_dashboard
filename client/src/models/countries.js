const Request = require('../helpers/request.js');

const Countries = function() {
  this.countries = [];
  this.url = 'https://restcountries.eu/rest/v2/all';
}

Countries.prototype.getData = function(onComplete) {
  const request = new Request(this.url);
  request.get((response) => {
    this.countries = response;
    onComplete(response);
  });
};

Countries.prototype.findByAlpha3Code = function (code) {
  return this.countries.find(country => country.alpha3code === code);
};

module.exports = Countries;
