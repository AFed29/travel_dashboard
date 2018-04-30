const AllCountriesView = function() {
}

AllCountriesView.prototype.renderSelect = function (countriesArray, selectList) {

  countriesArray.forEach((country, index) => {
    renderOption(selectList, country, index);

  });
};


const renderOption = function(parentSelect, country, index) {
  const option = document.createElement('option');
  option.textContent = country.name;
  option.value = index;
  parentSelect.appendChild(option);
};

module.exports = AllCountriesView;
