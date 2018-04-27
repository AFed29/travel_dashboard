const AllCountriesView = function() {
}

AllCountriesView.prototype.renderSelects = function (countriesArray) {
  const visitedSelect = document.querySelector('#visited-select');
  const toVisitSelect = document.querySelector('#to-visit-select');

  countriesArray.forEach(country => {
    renderOption(visitedSelect, country);
    renderOption(toVisitSelect, country);
  });
};


const renderOption = function(parentSelect, country) {
  const option = document.createElement('option');
  option.textContent = country.name;
  option.value = country.alpha3Code;
  parentSelect.appendChild(option);
};

module.exports = AllCountriesView;
