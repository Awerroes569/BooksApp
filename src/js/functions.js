const utils = {}; // eslint-disable-line no-unused-vars

utils.createDOMFromHTML = function(htmlString) {
  let div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
};

utils.createDeepClone = function (obj) {
  return JSON.parse(JSON.stringify(obj));
};

utils.toggleFavourite = function (clickedElement, id,array) {
  if (array.includes(id)) {
    array.splice(array.indexOf(id), 1);
    clickedElement.classList.remove('favorite');
  } else {
    array.push(id);
    clickedElement.classList.add('favorite');
  }
};