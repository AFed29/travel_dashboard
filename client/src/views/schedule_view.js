const ScheduleView = function () {
}

ScheduleView.prototype.renderAll = function (scheduleArray) {
  const scheduleContainer = document.querySelector('#schedules');
  scheduleArray.forEach(schedule => {
    renderSingleSchedule(scheduleContainer, schedule);
  })
};


ScheduleView.prototype.renderOne = function (schedule) {
console.log('Got to render one');
  const scheduleContainer = document.querySelector('#schedules');
  renderSingleSchedule(scheduleContainer, schedule);
};

ScheduleView.prototype.renderSelect = function (toVisitCountriesArray) {
  const countrySelect = document.querySelector('#scheduleCountry');

  toVisitCountriesArray.forEach(country => {
    renderOption(countrySelect, country);
  });

};

const renderOption = function(parentSelect, country) {
  const option = document.createElement('option');
  option.textContent = country.name;
  option.value = country._id;
  parentSelect.appendChild(option);
};

const renderSingleSchedule = function(parentContainer, schedule){
  const ul= document.createElement('ul');
  const country = document.createElement('li');
  country.textContent = `Destination: ${schedule.country.name}`
  const startDate = document.createElement('li');
  startDate.textContent = `Start date: ${schedule.startDate}`
  const endDate = document.createElement('li');
  endDate.textContent = `End date: ${schedule.endDate}`
  ul.appendChild(country);
  ul.appendChild(startDate);
  ul.appendChild(endDate);
  parentContainer.appendChild(ul);
}



module.exports = ScheduleView;
