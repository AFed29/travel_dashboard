const AllCountriesView = function() {
}

AllCountriesView.prototype.renderSelects = function (countriesArray) {
  const visitedSelect = document.querySelector('#visited-select');
  const toVisitSelect = document.querySelector('#to-visit-select');

  countriesArray.forEach((country, index) => {
    renderOption(visitedSelect, country, index);
    renderOption(toVisitSelect, country, index);
  });
};


const renderOption = function(parentSelect, country, index) {
  const option = document.createElement('option');
  option.textContent = country.name;
  option.value = index;
  parentSelect.appendChild(option);
};

module.exports = AllCountriesView;
