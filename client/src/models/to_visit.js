
const ToVisit = function(country) {
  this.name = country.name;
  this.latlng = {lat: country.latlng[0], lng: country.latlng[1]};
  this.flagUrl = country.flag;
  this.capital = country.capital;
  this.currencies = country.currencies;
  this.languages = country.languages;
}

module.exports = ToVisit;
