const Request = require('./helpers/request.js');
const ScheduleView = require('./views/schedule_view.js');
const Schedule = require('./models/schedule.js');


const id = window.location.pathname.split('/')[2];
let newSchedule;

const renderPage = function(schedule){
  newSchedule = new Schedule(schedule);
  const scheduleContainer = document.querySelector('#schedule');
  const scheduleView = new ScheduleView();
  scheduleView.renderSchedulePage(newSchedule);
};

const pageLoad = function(){
  const scheduleRequest = new Request('http://localhost:3000/schedule/object/'+id);
  scheduleRequest.get(renderPage);
  const noteForm = document.querySelector('form');
  noteForm.addEventListener('submit', onNoteFormSubmit);
  const form = document.querySelector('form');
  const editNoteButton = document.querySelector('#editNote');
  editNoteButton.addEventListener('click', ()=> {
    form.classList.remove('hidden');
  });
};

const onNoteFormSubmit = function(event) {
  event.preventDefault();
  const noteText = event.target.noteInput.value;
  const updateRequest = new Request(`http://localhost:3000/schedule/${id}`);
  newSchedule.note = noteText;
  updateRequest.put(newSchedule, () => {
    const noteForm = document.querySelector('form');
    noteForm.classList.add('hidden');
    const note = document.querySelector('#note');
    note.textContent = noteText;

  });
}

document.addEventListener('DOMContentLoaded', pageLoad);
