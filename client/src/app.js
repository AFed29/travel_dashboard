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
  const scheduleCountrySelect = document.querySelector('#scheduleCountry');
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
    scheduleView.renderSelect(toVisitCountries);
  });

  scheduleRequest.get((schedules) => {
    const allSchedules = [];

    schedules.forEach((schedule) => {
      const newSchedule = new Schedule(schedule);
      newSchedule.getCountryInfo(() =>{
      scheduleView.renderOne(newSchedule)
    });

      allSchedules.push(newSchedule);
    });
  });

  visitedSelect.addEventListener('change', (event) => {
    const selectedCountry = countries.allCountries[event.target.value];
    if (!countries.findIfCountryAlreadyInVisited(selectedCountry)) {
      const newVistedCountry = new Visited(selectedCountry);
      visitedRequest.post(newVistedCountry, (country) => {
        mainMap.addVisitedMarker(country.latlng);
        visitedView.renderOne(country);
        countries.visitedCountries.push(country);
      });
    }
  });

  toVisitSelect.addEventListener('change', (event) => {
    const selectedCountry = countries.allCountries[event.target.value];
    if (!countries.findIfCountryAlreadyInToVisit(selectedCountry)) {
      const newToVisitCountry = new ToVisit(selectedCountry);
      toVisitRequest.post(newToVisitCountry,  (country) => {
        mainMap.addToVisitMarker(country.latlng, country);
        toVisitView.renderOne(country);
        countries.toVisitCountries.push(country);
        scheduleView.renderOption(scheduleCountrySelect, country);
      });
    }
  });

  const createScheduleForm = document.querySelector('form');
  createScheduleForm.addEventListener('submit', onScheduleFormSubmit);

};

const createScheduleRequestComplete = function(schedule) {
  const newSchedule = new Schedule(schedule);
  newSchedule.getCountryInfo(() => {
    scheduleView.renderOne(newSchedule);
  })
}

const onScheduleFormSubmit = function(event) {
  event.preventDefault();
  console.log('Form submitted');

  const countryID = event.target.scheduleCountry.value;
  const startDate = event.target.startDate.value;
  const endDate = event.target.endDate.value;

  const newSchedule = new Schedule({countryID: countryID, startDate: startDate, endDate: endDate});
  console.log('new schedule:', newSchedule);
  scheduleRequest.post(newSchedule, createScheduleRequestComplete);
}



document.addEventListener('DOMContentLoaded', appStart);
