const Request = require('./helpers/request.js');
const ScheduleView = require('./views/schedule_view.js');
const Schedule = require('./models/schedule.js');

const renderPage = function(schedule){
  const newSchedule = new Schedule(schedule);
  const scheduleContainer = document.querySelector('#schedule');
  const scheduleView = new ScheduleView();
  scheduleView.renderOne(newSchedule, scheduleContainer);
};

const pageLoad = function(){
  const id = window.location.pathname.split('/')[2];
  console.log(window.location.pathname.split('/'));
  console.log(id);
  const scheduleRequest = new Request('HTTP://localhost:3000/schedule/object/'+id);
  scheduleRequest.get(renderPage);
};

document.addEventListener('DOMContentLoaded', pageLoad);
