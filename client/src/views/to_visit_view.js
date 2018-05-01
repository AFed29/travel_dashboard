const ToVisitView = function () {
}

ToVisitView.prototype.renderAll = function (toVisitCountryArray, request) {
  const toVisitList = document.querySelector('#to-visit-list');
  toVisitCountryArray.forEach(country => {
    renderListItem(toVisitList, country.name);
    renderDeleteButton(toVisitList, country._id, request);
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

const renderDeleteButton = function (parentList, id, request) {
  const button = document.createElement('button');
  button.textContent = 'Delete';
  button.addEventListener('click', function (evt) {
    request.delete(id, function () {
      console.log('Country Deleted');
    });
  });

  parentList.appendChild(button);
}

module.exports = ToVisitView;
