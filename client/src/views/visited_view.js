const VisitedView = function () {
}

VisitedView.prototype.renderAll = function (visitedCountriesArray) {
  const visitedList = document.querySelector('#visited-list');
  visitedCountriesArray.forEach(country => {
    renderListItem(visitedList, country);
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

module.exports = VisitedView;
