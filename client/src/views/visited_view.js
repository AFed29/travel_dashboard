const VisitedView = function () {
}

VisitedView.prototype.renderAll = function (visitedCountriesArray, request) {
  const visitedList = document.querySelector('#visited-list');
  visitedCountriesArray.forEach((country) => {
    const li = renderListItem(visitedList, country);
    renderDeleteButton(li, country._id, request);
  });
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
};

module.exports = VisitedView;
