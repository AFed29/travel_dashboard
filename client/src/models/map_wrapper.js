const MapWrapper = function(container, center, zoom) {
  this.googleMap = new google.maps.Map(container, {center: center, zoom: zoom});

  this.visitedMarkers = [];
  this.toVisitMarkers = [];
}

MapWrapper.prototype.addVisitedMarker = function (coordinates) {
  const marker = new google.maps.Marker({map: this.googleMap, position: coordinates});
  this.visitedMarkers.push(marker);
};

MapWrapper.prototype.addtoVisitMarker = function (coordinates) {
  const marker = new google.maps.Marker({map: this.googleMap, position: coordinates});
  this.toVisitMarkers.push(marker);
};

MapWrapper.prototype.populateAllVisitedMarkers = function (visitedCountries) {
  visitedCountries.forEach(country => this.addVisitedMarker(country.latlng));
};

MapWrapper.prototype.populateAllToVisitMarkers = function (toVisitCountries) {
  toVisitCountries.forEach(country => this.addtoVisitMarker(country.latlng));
};

module.exports = MapWrapper;
