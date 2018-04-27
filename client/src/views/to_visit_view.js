const ToVisitView = function () {
}

ToVisitView.prototype.renderAll = function (toVisitCountryArray) {
  const toVisitList = document.querySelector('#to-visit-list');
  toVisitCountryArray.forEach(country => {
    renderListItem(toVisitList, country);
  });
};

ToVisitView.prototype.renderOne = function (country) {
  const toVisitList = document.querySelector('#to-visit-list');
  renderListItem(toVisitList, country);
};

const renderListItem = function (parentList, country) {
  const li = document.createElement('li');
  li.textContent = country.name;
  parentList.appendChild(li);
};

module.exports = ToVisitView;
