const AllCountriesView = require('./views/all_countries_view.js');
const VisitedView = require('./views/visited_view.js');
const ToVisitView = require('./views/to_visit_view.js');
const Countries = require('./models/countries.js');
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
}

document.addEventListener('DOMContentLoaded', appStart);
