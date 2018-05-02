const InfoView = function () {}

InfoView.prototype.renderInfoBox = function (parentContainer, country) {
  parentContainer.innerHTML = "";

  const ul = document.createElement('ul');

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
  parentContainer.appendChild(ul);
};

const renderListItem = function (parentList, data) {
  const li = document.createElement('li');
  li.textContent = data;
  parentList.appendChild(li);
};

module.exports = InfoView;
