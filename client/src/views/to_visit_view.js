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

ToVisitView.prototype.renderInfoBox = function (country) {
  const infoBox = document.querySelector('#info-box');
  infoBox.innerHTML = "";

  const ul = document.createElement('ul');
  renderListItem(ul, country.capital);
  country.currencies.forEach( currency => {
    renderListItem(ul, currency.name);
  });
  country.languages.forEach( language => {
    renderListItem(ul, language.name);
  });
  infoBox.appendChild(ul);
};

const renderListItem = function (parentList, data) {
  const li = document.createElement('li');
  li.textContent = data;
  parentList.appendChild(li);
};

module.exports = ToVisitView;
