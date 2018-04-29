
const ToVisit = function(country) {
  this.name = country.name;
  this.latlng = {lat: country.latlng[0], lng: country.latlng[1]};
}

module.exports = ToVisit;
