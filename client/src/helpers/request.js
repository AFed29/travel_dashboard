const Request = function(url) {
  this.url = url;
}

Request.prototype.get = function (onComplete) {
  const request = new XMLHttpRequest();
  request.open('GET', this.url);

  request.addEventListener('load', function() {
    if(request.status !== 200) return;
    console.log(request.responseText);
    const response = JSON.parse(request.responseText);

    onComplete(response);
  });

  request.send();
};

Request.prototype.post = function (dataToSend, onComplete) {
  const request = new XMLHttpRequest();
  request.open('POST', this.url);

  request.setRequestHeader('Content-Type', 'application/json');

  request.addEventListener('load', function() {
    if(request.status !== 201) return;
    const response = JSON.parse(request.responseText);

    onComplete(response);
  });

  const jsonDataToSend = JSON.stringify(dataToSend);
  request.send(jsonDataToSend);
};

Request.prototype.put = function (dataToSend, onComplete) {
  const request = new XMLHttpRequest();
  request.open('PUT', this.url);

  request.setRequestHeader('Content-Type', 'application/json');

  request.addEventListener('load', function() {
    if(request.status !== 204) return;
    onComplete();
  });

  const jsonDataToSend = JSON.stringify(dataToSend);
  request.send(jsonDataToSend);
};


Request.prototype.delete = function (id, onComplete) {
  const request = new XMLHttpRequest();
  request.open('DELETE', `${this.url}${id}`);

  request.addEventListener('load', function() {
    if(request.status !== 204) return;

    onComplete();
  });
  request.send();
};

module.exports = Request;
