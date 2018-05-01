const ToVisitView = function () {
}

ToVisitView.prototype.renderAll = function (toVisitCountryArray, request) {
  const toVisitList = document.querySelector('#to-visit-list');
  toVisitCountryArray.forEach(country => {
    const li = renderListItem(toVisitList, country);

    renderDeleteButton(li, country._id, request);
  });
};

ToVisitView.prototype.renderOne = function (country) {
  const toVisitList = document.querySelector('#to-visit-list');
  renderListItem(toVisitList, country.name);
};

const renderListItem = function (parentList, country) {
  const li = document.createElement('li');
  li.id = country._id;
  li.textContent = country.name;
  parentList.appendChild(li);
  return li;
};

const renderDeleteButton = function (parentList, id, request) {
  const button = document.createElement('button');
  button.textContent = 'Delete';
  button.addEventListener('click', function (evt) {
    request.delete(id, function () {
      const listItem = document.getElementById(id);
      console.log(listItem);
      listItem.parentNode.removeChild(listItem);

    });
  });

  parentList.appendChild(button);
}

module.exports = ToVisitView;
