const InfoView = require('../views/info_view.js')

const infoView = new InfoView();

const MapWrapper = function(container, center, zoom) {
  this.googleMap = new google.maps.Map(container, {center: center, zoom: zoom});

  this.visitedMarkers = [];
  this.toVisitMarkers = [];

  this.toVisitIcon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
  this.visitedIcon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
  
}

MapWrapper.prototype.addVisitedMarker = function (coordinates) {
  const marker = new google.maps.Marker({map: this.googleMap, position: coordinates, icon: this.visitedIcon});
  this.visitedMarkers.push(marker);
};

MapWrapper.prototype.addToVisitMarker = function (coordinates, country) {
  const marker = new google.maps.Marker({map: this.googleMap, position: coordinates, icon: this.toVisitIcon});

  marker.addListener('click', function() {
    const infoBox = document.querySelector('#info-box');
    infoView.renderInfoBox(infoBox, country);
  });

    this.toVisitMarkers.push(marker);
};

MapWrapper.prototype.populateAllVisitedMarkers = function (visitedCountries) {
  visitedCountries.forEach(country => this.addVisitedMarker(country.latlng));
};

MapWrapper.prototype.populateAllToVisitMarkers = function (toVisitCountries) {
  toVisitCountries.forEach(country => this.addToVisitMarker(country.latlng, country));
};

module.exports = MapWrapper;
