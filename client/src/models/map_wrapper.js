const MapWrapper = function(container, center, zoom) {
  this.googleMap = new google.maps.Map(container, {center: center, zoom: zoom});

  this.visitedMarkers = [];
  this.toVisitMarkers = [];
}

module.exports = MapWrapper;
