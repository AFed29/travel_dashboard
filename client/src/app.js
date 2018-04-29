const AllCountriesView = require('./views/all_countries_view.js');
const VisitedView = require('./views/visited_view.js');
const ToVisitView = require('./views/to_visit_view.js');
const Visited = require('./models/visited.js');
const ToVisit = require('./models/to_visit.js');
const Countries = require('./models/countries.js');
const MapWrapper = require('./models/map_wrapper.js');
const Request = require('./helpers/request.js');
const Schedule =  require('./models/schedule.js');
const ScheduleView = require('./views/schedule_view.js');

const countriesView = new AllCountriesView();
const visitedView = new VisitedView();
const toVisitView = new ToVisitView();
const scheduleView = new ScheduleView();
const countries = new Countries();

const visitedRequest = new Request('http://localhost:3000/visited/');
const toVisitRequest = new Request('http://localhost:3000/tovisit/');
const scheduleRequest = new Request('http://localhost:3000/schedule/');

const appStart = function() {
  const visitedSelect = document.querySelector('#visited-select');
  const toVisitSelect = document.querySelector('#to-visit-select');
  const mapContainer = document.querySelector('#map-wrapper');
  const codeClan = {lat: 55.946962, lng: -3.201958};
  const mainMap = new MapWrapper(mapContainer, codeClan, 3);

  countries.getData(countriesView.renderSelects);

  visitedRequest.get((visitedCountries) => {
    countries.visitedCountries = visitedCountries;
    visitedView.renderAll(visitedCountries);
    mainMap.populateAllVisitedMarkers(visitedCountries);
  });

  toVisitRequest.get((toVisitCountries) => {
    countries.toVisitCountries = toVisitCountries;
    toVisitView.renderAll(toVisitCountries);
    mainMap.populateAllToVisitMarkers(toVisitCountries);
  });

  scheduleRequest.get((schedules) => {
    const allSchedules = [];
    schedules.forEach((schedule) => {
      console.log(schedule);
      const newSchedule = new Schedule(schedule);
      newSchedule.getCountryInfo(() =>{
        console.log(newSchedule);
      scheduleView.renderOne(newSchedule)
    });
      allSchedules.push(newSchedule);
      console.log(newSchedule);
    })
    // scheduleView.renderAll(allSchedules);

  })

  visitedSelect.addEventListener('change', (event) => {
    const selectedCountry = countries.findByAlpha3Code(event.target.value);
    const newVistedCountry = new Visited(selectedCountry);
    visitedRequest.post(newVistedCountry, (country) => {
      mainMap.addVisitedMarker(country.latlng);
      visitedView.renderOne(country);
    });
  });

  toVisitSelect.addEventListener('change', (event) => {
    const selectedCountry = countries.findByAlpha3Code(event.target.value);
    const newToVisitCountry = new ToVisit(selectedCountry);
    toVisitRequest.post(newToVisitCountry,  (country) => {
      mainMap.addToVisitMarker(country.latlng);
      toVisitView.renderOne(country);
    });
  });

};

document.addEventListener('DOMContentLoaded', appStart);
