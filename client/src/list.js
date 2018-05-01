const VistedView = require('./views/visited_view.js')
const ToVisitView = require('./views/to_visit_view.js')
const Request = require('./helpers/request.js')

const toVisitView = new ToVisitView();
const visitedView = new VistedView();

const visitedRequest = new Request('http://localhost:3000/visited/');
const toVisitRequest = new Request('http://localhost:3000/tovisit/');

const listStart = function(){
  toVisitRequest.get((toVisitCountries) => {
    toVisitView.renderAll(toVisitCountries, toVisitRequest);
  });
  visitedRequest.get((visitedCountries) => {
    visitedView.renderAll(visitedCountries, visitedRequest);
  });
};

document.addEventListener('DOMContentLoaded', listStart);
