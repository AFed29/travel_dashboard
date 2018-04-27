const AllCountriesView = require('./views/all_countries_view.js');
const Countries = require('./models/countries.js');

const countriesView = new AllCountriesView();
const countries = new Countries();

const appStart = function() {
  countries.getData(countriesView.renderSelects);
}

document.addEventListener('DOMContentLoaded', appStart);
