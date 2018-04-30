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

  renderListItem(ul, `Country: ${country.name}`);

  const flag = document.createElement('img');
  flag.id = 'flag-image';
  flag.src = country.flagUrl;
  ul.appendChild(flag);

  renderListItem(ul, `Capital: ${country.capital}`);

  renderListItem(ul, "Currencies:");
  const currencyUl = document.createElement('ul');
  ul.appendChild(currencyUl);
  country.currencies.forEach( currency => {
    renderListItem(currencyUl, currency.name);
  });

  renderListItem(ul, "Languages:");
  const languageUl = document.createElement('ul');
  ul.appendChild(languageUl);
  country.languages.forEach( language => {
    renderListItem(languageUl, language.name);
  });
  infoBox.appendChild(ul);
};

const renderListItem = function (parentList, data) {
  const li = document.createElement('li');
  li.textContent = data;
  parentList.appendChild(li);
};

module.exports = ToVisitView;
