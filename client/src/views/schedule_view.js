const Helpers = require('../helpers/format_helpers.js');
const InfoView = require('./info_view.js');

const infoView = new InfoView();

const ScheduleView = function () {
}

ScheduleView.prototype.renderAll = function (scheduleArray) {
  const scheduleContainer = document.querySelector('#schedules');
  scheduleArray.forEach(schedule => {
    renderSingleSchedule(scheduleContainer, schedule);
  })
};

ScheduleView.prototype.renderNextTrip = function (schedule) {
  const scheduleContainer = document.querySelector('#next-trip-schedule');
  const infoContainer = document.querySelector('#next-trip-info');
  infoView.renderInfoBox(infoContainer, schedule.country);
  renderSingleSchedule(scheduleContainer, schedule);
};

ScheduleView.prototype.renderOne = function (schedule, container) {
  renderSingleSchedule(container, schedule);
};

ScheduleView.prototype.renderSelect = function (toVisitCountriesArray) {
  const countrySelect = document.querySelector('#scheduleCountry');

  toVisitCountriesArray.forEach(country => {
    this.renderOption(countrySelect, country);
  });
};

ScheduleView.prototype.renderOption = function(parentSelect, country) {
  const option = document.createElement('option');
  option.textContent = country.name;
  option.value = country._id;
  parentSelect.appendChild(option);
};

ScheduleView.prototype.renderSchedulePage = function (schedule) {
  console.log('schedule', schedule);
  const destination = document.querySelector('#destination');
  destination.textContent = schedule.country.name;
  const startDate = document.querySelector('#startDate');
  startDate.textContent = Helpers.prettyDate(schedule.startDate);
  const endDate = document.querySelector('#endDate');
  endDate.textContent = Helpers.prettyDate(schedule.endDate);
  const note = document.querySelector('#note');
  const form = document.querySelector('form');
  if (schedule.note) {
    note.textContent = schedule.note;
    form.noteInput.value = schedule.note
    form.classList.add("hidden")
  }
  else {
    note.classList.add("hidden");
  }
};

const renderSingleSchedule = function(parentContainer, schedule){
  const ul= document.createElement('ul');
  const country = document.createElement('li');
  country.textContent = `Destination: ${schedule.country.name}`
  const startDate = document.createElement('li');
  startDate.textContent = `Start date: ${Helpers.prettyDate(schedule.startDate)}`
  const endDate = document.createElement('li');
  endDate.textContent = `End date: ${Helpers.prettyDate(schedule.endDate)}`
  const scheduleLink = document.createElement('a');
  scheduleLink.textContent = 'View schedule details';
  scheduleLink.href = `HTTP://localhost:3000/schedule/${schedule.id}`;
  ul.appendChild(country);
  ul.appendChild(startDate);
  ul.appendChild(endDate);
  ul.appendChild(scheduleLink);
  parentContainer.appendChild(ul);
}



module.exports = ScheduleView;
