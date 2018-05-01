const VisitedView = function () {
}

VisitedView.prototype.renderAll = function (visitedCountriesArray, request) {
  const visitedList = document.querySelector('#visited-list');
  visitedCountriesArray.forEach((country) => {
    renderListItem(visitedList, country);
    renderDeleteButton(visitedList, country._id, request);
  });
};

VisitedView.prototype.renderOne = function (country) {
  const visitedList = document.querySelector('#visited-list');
  renderListItem(visitedList, country);
};

const renderListItem = function (parentList, country) {
  const li = document.createElement('li');
  li.textContent = country.name;
  parentList.appendChild(li);
};

const renderDeleteButton = function (parentList, id, request) {
  const button = document.createElement('button');
  button.textContent = 'Delete';
  button.addEventListener('click', function (evt) {
    request.delete(id, function () {
      console.log('Country Deleted');
    });
  });

  parentList.appendChild(button);
};

module.exports = VisitedView;
