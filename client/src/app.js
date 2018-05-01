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

  countries.getData((countriesArray)=>{
    countriesView.renderSelect(countriesArray, visitedSelect);
    countriesView.renderSelect(countriesArray, toVisitSelect);
  });

  visitedRequest.get((visitedCountries) => {
    countries.visitedCountries = visitedCountries;
    mainMap.populateAllVisitedMarkers(visitedCountries);

  });

  const visitedIcon = document.querySelector('#visited-marker');
  visitedIcon.src = mainMap.visitedIcon;

  const toVisitIcon = document.querySelector('#to-visit-marker');
  toVisitIcon.src = mainMap.toVisitIcon;



  toVisitRequest.get((toVisitCountries) => {
    countries.toVisitCountries = toVisitCountries;
    mainMap.populateAllToVisitMarkers(toVisitCountries);
    scheduleView.renderSelect(toVisitCountries);
  });

  scheduleRequest.get((schedules) => {
    if (schedules.length) {
      const nextTrip = new Schedule(schedules.shift());
      nextTrip.getCountryInfo(() => {
        scheduleView.renderNextTrip(nextTrip);
      });
      schedules.forEach((schedule) => {
        const newSchedule = new Schedule(schedule);
        console.log(newSchedule);
        scheduleView.renderOne(newSchedule);
      });
    }
  });

  visitedSelect.addEventListener('change', (event) => {
    const selectedCountry = countries.allCountries[event.target.value];
    if (!countries.findIfCountryAlreadyInVisited(selectedCountry)) {
      const newVistedCountry = new Visited(selectedCountry);
      visitedRequest.post(newVistedCountry, (country) => {
        mainMap.addVisitedMarker(country.latlng);
        // visitedView.renderOne(country);
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
        // toVisitView.renderOne(country);
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
  document.querySelector('form').reset();

  newSchedule.getCountryInfo(() => {
    scheduleView.renderOne(newSchedule);
  })
}

const onScheduleFormSubmit = function(event) {
  event.preventDefault();

  const countryID = event.target.scheduleCountry.value;
  const startDate = event.target.startDate.value;
  const endDate = event.target.endDate.value;
  const errorMessage = document.querySelector('#input-error');

  let today = new Date();
  today.setHours(0, 0, 0);
  if (Date.parse(endDate) >= today && Date.parse(endDate) > Date.parse(startDate)) {
    errorMessage.classList.add('hidden');
    errorMessage.textContent = '';
    const newSchedule = new Schedule({countryID: countryID, startDate: startDate, endDate: endDate});
    console.log('new schedule:', newSchedule);
    newSchedule.getCountryInfo(()=> {
      scheduleRequest.post(newSchedule, createScheduleRequestComplete);
    })
  }
  else {
    errorMessage.textContent = 'Trips must end after today';
    errorMessage.classList.remove('hidden');
  }
}



document.addEventListener('DOMContentLoaded', appStart);
