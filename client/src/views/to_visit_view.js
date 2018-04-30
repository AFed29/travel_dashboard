const ToVisitView = function () {
}

ToVisitView.prototype.renderAll = function (toVisitCountryArray) {
  const toVisitList = document.querySelector('#to-visit-list');
  toVisitCountryArray.forEach(country => {
    renderListItem(toVisitList, country.name);
  });
};

ToVisitView.prototype.renderOne = function (country) {
  const toVisitList = document.querySelector('#to-visit-list');
  renderListItem(toVisitList, country.name);
};

const renderListItem = function (parentList, data) {
  const li = document.createElement('li');
  li.textContent = data;
  parentList.appendChild(li);
};

module.exports = ToVisitView;
