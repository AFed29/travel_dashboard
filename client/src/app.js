const AllCountriesView = require('./views/all_countries_view.js');
const VisitedView = require('./views/visited_view.js');
const ToVisitView = require('./views/to_visit_view.js');
const Visited = require('./models/visited.js');
const ToVisit = require('./models/to_visit.js');
const Countries = require('./models/countries.js');
const MapWrapper = require('./models/map_wrapper.js');
const Request = require('./helpers/request.js');

const countriesView = new AllCountriesView();
const visitedView = new VisitedView();
const toVisitView = new ToVisitView();
const countries = new Countries();

const visitedRequest = new Request('http://localhost:3000/visited/');
const toVisitRequest = new Request('http://localhost:3000/tovisit/');

const appStart = function() {
  countries.getData(countriesView.renderSelects);

  visitedRequest.get(visitedView.renderAll);
  toVisitRequest.get(toVisitView.renderAll);

  const visitedSelect = document.querySelector('#visited-select');
  const toVisitSelect = document.querySelector('#to-visit-select');
  const mapContainer = document.querySelector('#map-wrapper');

  visitedSelect.addEventListener('change', (event) => {
    const selectedCountry = countries.findByAlpha3Code(event.target.value);
    const newVistedCountry = new Visited(selectedCountry);
    visitedRequest.post(newVistedCountry, visitedView.renderOne);
  });

  toVisitSelect.addEventListener('change', (event) => {
    const selectedCountry = countries.findByAlpha3Code(event.target.value);
    const newToVisitCountry = new ToVisit(selectedCountry);
    toVisitRequest.post(newToVisitCountry, toVisitView.renderOne);
  });
  const codeClan = {lat: 55.946962, lng: -3.201958};
  const mainMap = new MapWrapper(mapContainer, codeClan, 3);
};

document.addEventListener('DOMContentLoaded', appStart);
