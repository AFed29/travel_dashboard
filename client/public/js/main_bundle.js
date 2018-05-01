/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/src/app.js":
/*!***************************!*\
  !*** ./client/src/app.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const AllCountriesView = __webpack_require__(/*! ./views/all_countries_view.js */ \"./client/src/views/all_countries_view.js\");\nconst VisitedView = __webpack_require__(/*! ./views/visited_view.js */ \"./client/src/views/visited_view.js\");\nconst ToVisitView = __webpack_require__(/*! ./views/to_visit_view.js */ \"./client/src/views/to_visit_view.js\");\nconst Visited = __webpack_require__(/*! ./models/visited.js */ \"./client/src/models/visited.js\");\nconst ToVisit = __webpack_require__(/*! ./models/to_visit.js */ \"./client/src/models/to_visit.js\");\nconst Countries = __webpack_require__(/*! ./models/countries.js */ \"./client/src/models/countries.js\");\nconst MapWrapper = __webpack_require__(/*! ./models/map_wrapper.js */ \"./client/src/models/map_wrapper.js\");\nconst Request = __webpack_require__(/*! ./helpers/request.js */ \"./client/src/helpers/request.js\");\nconst Schedule =  __webpack_require__(/*! ./models/schedule.js */ \"./client/src/models/schedule.js\");\nconst ScheduleView = __webpack_require__(/*! ./views/schedule_view.js */ \"./client/src/views/schedule_view.js\");\n\nconst countriesView = new AllCountriesView();\nconst visitedView = new VisitedView();\nconst toVisitView = new ToVisitView();\nconst scheduleView = new ScheduleView();\nconst countries = new Countries();\n\nconst visitedRequest = new Request('http://localhost:3000/visited/');\nconst toVisitRequest = new Request('http://localhost:3000/tovisit/');\nconst scheduleRequest = new Request('http://localhost:3000/schedule/');\n\nconst appStart = function() {\n  const visitedSelect = document.querySelector('#visited-select');\n  const toVisitSelect = document.querySelector('#to-visit-select');\n\n  const mapContainer = document.querySelector('#map-wrapper');\n  const scheduleCountrySelect = document.querySelector('#scheduleCountry');\n  const codeClan = {lat: 55.946962, lng: -3.201958};\n  const mainMap = new MapWrapper(mapContainer, codeClan, 3);\n\n  countries.getData((countriesArray)=>{\n    countriesView.renderSelect(countriesArray, visitedSelect);\n    countriesView.renderSelect(countriesArray, toVisitSelect);\n  });\n\n  visitedRequest.get((visitedCountries) => {\n    countries.visitedCountries = visitedCountries;\n    visitedView.renderAll(visitedCountries);\n    mainMap.populateAllVisitedMarkers(visitedCountries);\n\n  });\n\n  const visitedIcon = document.querySelector('#visited-marker');\n  visitedIcon.src = mainMap.visitedIcon;\n\n  const toVisitIcon = document.querySelector('#to-visit-marker');\n  toVisitIcon.src = mainMap.toVisitIcon;\n\n\n\n  toVisitRequest.get((toVisitCountries) => {\n    countries.toVisitCountries = toVisitCountries;\n    toVisitView.renderAll(toVisitCountries);\n    mainMap.populateAllToVisitMarkers(toVisitCountries);\n    scheduleView.renderSelect(toVisitCountries);\n  });\n\n  scheduleRequest.get((schedules) => {\n    if (schedules.length) {\n      const nextTrip = new Schedule(schedules.shift());\n      nextTrip.getCountryInfo(() => {\n        scheduleView.renderNextTrip(nextTrip);\n      });\n      schedules.forEach((schedule) => {\n        const newSchedule = new Schedule(schedule);\n        console.log(newSchedule);\n        scheduleView.renderOne(newSchedule);\n      });\n    }\n  });\n\n  visitedSelect.addEventListener('change', (event) => {\n    const selectedCountry = countries.allCountries[event.target.value];\n    if (!countries.findIfCountryAlreadyInVisited(selectedCountry)) {\n      const newVistedCountry = new Visited(selectedCountry);\n      visitedRequest.post(newVistedCountry, (country) => {\n        mainMap.addVisitedMarker(country.latlng);\n        visitedView.renderOne(country);\n        countries.visitedCountries.push(country);\n      });\n    }\n  });\n\n  toVisitSelect.addEventListener('change', (event) => {\n    const selectedCountry = countries.allCountries[event.target.value];\n    if (!countries.findIfCountryAlreadyInToVisit(selectedCountry)) {\n      const newToVisitCountry = new ToVisit(selectedCountry);\n      toVisitRequest.post(newToVisitCountry,  (country) => {\n        mainMap.addToVisitMarker(country.latlng, country);\n        toVisitView.renderOne(country);\n        countries.toVisitCountries.push(country);\n        scheduleView.renderOption(scheduleCountrySelect, country);\n      });\n    }\n  });\n\n  const createScheduleForm = document.querySelector('form');\n  createScheduleForm.addEventListener('submit', onScheduleFormSubmit);\n\n};\n\nconst createScheduleRequestComplete = function(schedule) {\n  const newSchedule = new Schedule(schedule);\n  document.querySelector('form').reset();\n\n  newSchedule.getCountryInfo(() => {\n    scheduleView.renderOne(newSchedule);\n  })\n}\n\nconst onScheduleFormSubmit = function(event) {\n  event.preventDefault();\n\n  const countryID = event.target.scheduleCountry.value;\n  const startDate = event.target.startDate.value;\n  const endDate = event.target.endDate.value;\n  const errorMessage = document.querySelector('#input-error');\n\n  let today = new Date();\n  today.setHours(0, 0, 0);\n  if (Date.parse(endDate) >= today) {\n    errorMessage.classList.add('hidden');\n    errorMessage.textContent = '';\n    const newSchedule = new Schedule({countryID: countryID, startDate: startDate, endDate: endDate});\n    console.log('new schedule:', newSchedule);\n    newSchedule.getCountryInfo(()=> {\n      scheduleRequest.post(newSchedule, createScheduleRequestComplete);\n    })\n  }\n  else {\n    errorMessage.textContent = 'Trips must end after today';\n    errorMessage.classList.remove('hidden');\n  }\n}\n\n\n\ndocument.addEventListener('DOMContentLoaded', appStart);\n\n\n//# sourceURL=webpack:///./client/src/app.js?");

/***/ }),

/***/ "./client/src/helpers/format_helpers.js":
/*!**********************************************!*\
  !*** ./client/src/helpers/format_helpers.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']\n\nconst prettyDate = function(date) {\n  return stringDate = `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;\n}\n\n\nmodule.exports = {\n  prettyDate\n};\n\n\n//# sourceURL=webpack:///./client/src/helpers/format_helpers.js?");

/***/ }),

/***/ "./client/src/helpers/request.js":
/*!***************************************!*\
  !*** ./client/src/helpers/request.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Request = function(url) {\n  this.url = url;\n}\n\nRequest.prototype.get = function (onComplete) {\n  const request = new XMLHttpRequest();\n  request.open('GET', this.url);\n\n  request.addEventListener('load', function() {\n    if(request.status !== 200) return;\n    const response = JSON.parse(request.responseText);\n\n    onComplete(response);\n  });\n\n  request.send();\n};\n\nRequest.prototype.post = function (dataToSend, onComplete) {\n  const request = new XMLHttpRequest();\n  request.open('POST', this.url);\n\n  request.setRequestHeader('Content-Type', 'application/json');\n\n  request.addEventListener('load', function() {\n    if(request.status !== 201) return;\n    const response = JSON.parse(request.responseText);\n\n    onComplete(response);\n  });\n\n  const jsonDataToSend = JSON.stringify(dataToSend);\n  request.send(jsonDataToSend);\n};\n\nmodule.exports = Request;\n\n\n//# sourceURL=webpack:///./client/src/helpers/request.js?");

/***/ }),

/***/ "./client/src/models/countries.js":
/*!****************************************!*\
  !*** ./client/src/models/countries.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Request = __webpack_require__(/*! ../helpers/request.js */ \"./client/src/helpers/request.js\");\n\nconst Countries = function() {\n  this.allCountries = [];\n  this.visitedCountries = [];\n  this.toVisitCountries = [];\n  this.url = 'https://restcountries.eu/rest/v2/all';\n}\n\nCountries.prototype.getData = function(onComplete) {\n  const request = new Request(this.url);\n  request.get((response) => {\n    this.allCountries = response;\n    onComplete(response);\n  });\n};\n\nCountries.prototype.findIfCountryAlreadyInVisited = function (inputCountry) {\n  return this.visitedCountries.some((country) => {\n    return country.name === inputCountry.name;\n  });\n};\n\nCountries.prototype.findIfCountryAlreadyInToVisit = function (inputCountry) {\n  return this.toVisitCountries.some((country) => {\n    return country.name === inputCountry.name;\n  });\n};\n\nmodule.exports = Countries;\n\n\n//# sourceURL=webpack:///./client/src/models/countries.js?");

/***/ }),

/***/ "./client/src/models/map_wrapper.js":
/*!******************************************!*\
  !*** ./client/src/models/map_wrapper.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const InfoView = __webpack_require__(/*! ../views/info_view.js */ \"./client/src/views/info_view.js\")\n\nconst infoView = new InfoView();\n\nconst MapWrapper = function(container, center, zoom) {\n  this.googleMap = new google.maps.Map(container, {center: center, zoom: zoom});\n\n  this.visitedMarkers = [];\n  this.toVisitMarkers = [];\n\n  this.toVisitIcon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';\n  this.visitedIcon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';\n  \n}\n\nMapWrapper.prototype.addVisitedMarker = function (coordinates) {\n  const marker = new google.maps.Marker({map: this.googleMap, position: coordinates, icon: this.visitedIcon});\n  this.visitedMarkers.push(marker);\n};\n\nMapWrapper.prototype.addToVisitMarker = function (coordinates, country) {\n  const marker = new google.maps.Marker({map: this.googleMap, position: coordinates, icon: this.toVisitIcon});\n\n  marker.addListener('click', function() {\n    const infoBox = document.querySelector('#info-box');\n    infoView.renderInfoBox(infoBox, country);\n  });\n\n    this.toVisitMarkers.push(marker);\n};\n\nMapWrapper.prototype.populateAllVisitedMarkers = function (visitedCountries) {\n  visitedCountries.forEach(country => this.addVisitedMarker(country.latlng));\n};\n\nMapWrapper.prototype.populateAllToVisitMarkers = function (toVisitCountries) {\n  toVisitCountries.forEach(country => this.addToVisitMarker(country.latlng, country));\n};\n\nmodule.exports = MapWrapper;\n\n\n//# sourceURL=webpack:///./client/src/models/map_wrapper.js?");

/***/ }),

/***/ "./client/src/models/schedule.js":
/*!***************************************!*\
  !*** ./client/src/models/schedule.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Request = __webpack_require__(/*! ../helpers/request.js */ \"./client/src/helpers/request.js\");\n\n\nconst Schedule = function(schedule){\n  this.startDate = new Date(schedule.startDate);\n  this.endDate = new Date(schedule.endDate);\n  this.countryID = schedule.countryID;\n  this.country = schedule.country;\n}\n\nSchedule.prototype.getCountryInfo = function (onComplete) {\n  const toVisitCountryRequest = new Request(`http://localhost:3000/tovisit/${this.countryID}`);\n   toVisitCountryRequest.get((toVisitCountry) => {\n     this.country = toVisitCountry;\n     onComplete();\n   });\n};\nmodule.exports = Schedule;\n\n\n//# sourceURL=webpack:///./client/src/models/schedule.js?");

/***/ }),

/***/ "./client/src/models/to_visit.js":
/*!***************************************!*\
  !*** ./client/src/models/to_visit.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nconst ToVisit = function(country) {\n  this.name = country.name;\n  this.latlng = {lat: country.latlng[0], lng: (country.latlng[1] + 0.5)};\n  this.flagUrl = country.flag;\n  this.capital = country.capital;\n  this.currencies = country.currencies;\n  this.languages = country.languages;\n}\n\nmodule.exports = ToVisit;\n\n\n//# sourceURL=webpack:///./client/src/models/to_visit.js?");

/***/ }),

/***/ "./client/src/models/visited.js":
/*!**************************************!*\
  !*** ./client/src/models/visited.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Visited = function(country) {\n  this.name = country.name;\n  this.latlng = {lat: country.latlng[0], lng: (country.latlng[1] - 0.5)};\n}\n\nmodule.exports = Visited;\n\n\n//# sourceURL=webpack:///./client/src/models/visited.js?");

/***/ }),

/***/ "./client/src/views/all_countries_view.js":
/*!************************************************!*\
  !*** ./client/src/views/all_countries_view.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const AllCountriesView = function() {\n}\n\nAllCountriesView.prototype.renderSelect = function (countriesArray, selectList) {\n\n  countriesArray.forEach((country, index) => {\n    renderOption(selectList, country, index);\n\n  });\n};\n\n\nconst renderOption = function(parentSelect, country, index) {\n  const option = document.createElement('option');\n  option.textContent = country.name;\n  option.value = index;\n  parentSelect.appendChild(option);\n};\n\nmodule.exports = AllCountriesView;\n\n\n//# sourceURL=webpack:///./client/src/views/all_countries_view.js?");

/***/ }),

/***/ "./client/src/views/info_view.js":
/*!***************************************!*\
  !*** ./client/src/views/info_view.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const InfoView = function () {}\n\nInfoView.prototype.renderInfoBox = function (parentContainer, country) {\n  parentContainer.innerHTML = \"\";\n\n  const ul = document.createElement('ul');\n\n  renderListItem(ul, `Country: ${country.name}`);\n\n  const flag = document.createElement('img');\n  flag.id = 'flag-image';\n  flag.src = country.flagUrl;\n  ul.appendChild(flag);\n\n  renderListItem(ul, `Capital: ${country.capital}`);\n\n  renderListItem(ul, \"Currencies:\");\n  const currencyUl = document.createElement('ul');\n  ul.appendChild(currencyUl);\n  country.currencies.forEach( currency => {\n    renderListItem(currencyUl, currency.name);\n  });\n\n  renderListItem(ul, \"Languages:\");\n  const languageUl = document.createElement('ul');\n  ul.appendChild(languageUl);\n  country.languages.forEach( language => {\n    renderListItem(languageUl, language.name);\n  });\n  parentContainer.appendChild(ul);\n};\n\nconst renderListItem = function (parentList, data) {\n  const li = document.createElement('li');\n  li.textContent = data;\n  parentList.appendChild(li);\n};\n\nmodule.exports = InfoView;\n\n\n//# sourceURL=webpack:///./client/src/views/info_view.js?");

/***/ }),

/***/ "./client/src/views/schedule_view.js":
/*!*******************************************!*\
  !*** ./client/src/views/schedule_view.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Helpers = __webpack_require__(/*! ../helpers/format_helpers.js */ \"./client/src/helpers/format_helpers.js\");\nconst InfoView = __webpack_require__(/*! ./info_view.js */ \"./client/src/views/info_view.js\");\n\nconst infoView = new InfoView();\n\nconst ScheduleView = function () {\n}\n\nScheduleView.prototype.renderAll = function (scheduleArray) {\n  const scheduleContainer = document.querySelector('#schedules');\n  scheduleArray.forEach(schedule => {\n    renderSingleSchedule(scheduleContainer, schedule);\n  })\n};\n\nScheduleView.prototype.renderNextTrip = function (schedule) {\n  const scheduleContainer = document.querySelector('#next-trip-schedule');\n  const infoContainer = document.querySelector('#next-trip-info');\n  infoView.renderInfoBox(infoContainer, schedule.country);\n  renderSingleSchedule(scheduleContainer, schedule);\n};\n\nScheduleView.prototype.renderOne = function (schedule) {\n  const scheduleContainer = document.querySelector('#schedules');\n  renderSingleSchedule(scheduleContainer, schedule);\n};\n\nScheduleView.prototype.renderSelect = function (toVisitCountriesArray) {\n  const countrySelect = document.querySelector('#scheduleCountry');\n\n  toVisitCountriesArray.forEach(country => {\n    this.renderOption(countrySelect, country);\n  });\n\n};\n\nScheduleView.prototype.renderOption = function(parentSelect, country) {\n  const option = document.createElement('option');\n  option.textContent = country.name;\n  option.value = country._id;\n  parentSelect.appendChild(option);\n};\n\nconst renderSingleSchedule = function(parentContainer, schedule){\n  const ul= document.createElement('ul');\n  const country = document.createElement('li');\n  country.textContent = `Destination: ${schedule.country.name}`\n  const startDate = document.createElement('li');\n  startDate.textContent = `Start date: ${Helpers.prettyDate(schedule.startDate)}`\n  const endDate = document.createElement('li');\n  endDate.textContent = `End date: ${Helpers.prettyDate(schedule.endDate)}`\n  ul.appendChild(country);\n  ul.appendChild(startDate);\n  ul.appendChild(endDate);\n  parentContainer.appendChild(ul);\n}\n\n\n\nmodule.exports = ScheduleView;\n\n\n//# sourceURL=webpack:///./client/src/views/schedule_view.js?");

/***/ }),

/***/ "./client/src/views/to_visit_view.js":
/*!*******************************************!*\
  !*** ./client/src/views/to_visit_view.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const ToVisitView = function () {\n}\n\nToVisitView.prototype.renderAll = function (toVisitCountryArray) {\n  const toVisitList = document.querySelector('#to-visit-list');\n  toVisitCountryArray.forEach(country => {\n    renderListItem(toVisitList, country.name);\n  });\n};\n\nToVisitView.prototype.renderOne = function (country) {\n  const toVisitList = document.querySelector('#to-visit-list');\n  renderListItem(toVisitList, country.name);\n};\n\nconst renderListItem = function (parentList, data) {\n  const li = document.createElement('li');\n  li.textContent = data;\n  parentList.appendChild(li);\n};\n\nmodule.exports = ToVisitView;\n\n\n//# sourceURL=webpack:///./client/src/views/to_visit_view.js?");

/***/ }),

/***/ "./client/src/views/visited_view.js":
/*!******************************************!*\
  !*** ./client/src/views/visited_view.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const VisitedView = function () {\n}\n\nVisitedView.prototype.renderAll = function (visitedCountriesArray) {\n  const visitedList = document.querySelector('#visited-list');\n  visitedCountriesArray.forEach(country => {\n    renderListItem(visitedList, country);\n  });\n};\n\nVisitedView.prototype.renderOne = function (country) {\n  const visitedList = document.querySelector('#visited-list');\n  renderListItem(visitedList, country);\n};\n\nconst renderListItem = function (parentList, country) {\n  const li = document.createElement('li');\n  li.textContent = country.name;\n  parentList.appendChild(li);\n};\n\nmodule.exports = VisitedView;\n\n\n//# sourceURL=webpack:///./client/src/views/visited_view.js?");

/***/ })

/******/ });