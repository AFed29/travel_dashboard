const Helpers = require('../helpers/format_helpers.js');
const InfoView = require('./info_view.js');
const Schedule = require('../models/schedule.js')

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
  const scheduleContainer = document.querySelector('.next-trip-schedule');
    scheduleContainer.classList.remove('hidden');
  const title = document.createElement('h2');
  title.textContent = 'Upcoming trip';
  const country = document.createElement('p');
  country.textContent = schedule.country.name;
  const date = document.createElement('p');
  date.textContent = `${Helpers.prettyDate(schedule.startDate)} - ${Helpers.prettyDate(schedule.endDate)}`
  const scheduleLink = document.createElement('a');
  scheduleLink.textContent = 'View schedule details';
  scheduleLink.href = `HTTP://localhost:3000/schedule/${schedule.id}`;

  scheduleContainer.appendChild(title);
  scheduleContainer.appendChild(country);
  scheduleContainer.appendChild(date);
  scheduleContainer.appendChild(scheduleLink);
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

ScheduleView.prototype.renderAllSchedules = function(schedules) {
  if (schedules.length) {
    const nextTrip = new Schedule(schedules.shift());
    this.renderNextTrip(nextTrip);
    schedules.forEach((schedule) => {
      const newSchedule = new Schedule(schedule);
      const scheduleContainer = document.querySelector('#schedules');
      this.renderOne(newSchedule, scheduleContainer);
    });
  }
}

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
  const editNoteButton = document.querySelector('#editNote');

  if (schedule.note) {
    noteText = schedule.note.replace(/\n/g, '<br />');
    note.innerHTML = noteText;
    form.noteInput.value = schedule.note;
    form.classList.add("hidden");
  }
  else {
    note.classList.add("hidden");
    editNoteButton.classList.add("hidden");
  }
};

const renderSingleSchedule = function(parentContainer, schedule){
  const ul= document.createElement('ul');
  const country = document.createElement('li');
  country.textContent = schedule.country.name;
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
