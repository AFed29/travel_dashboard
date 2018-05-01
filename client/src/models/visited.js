const Visited = function(country) {
  this.name = country.name;
  this.latlng = {lat: country.latlng[0], lng: (country.latlng[1] - 0.5)};
}

module.exports = Visited;
