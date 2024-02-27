const utils = {}; // eslint-disable-line no-unused-vars

utils.createDOMFromHTML = function(htmlString) {
  let div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
};

utils.createDeepClone = function (obj) {
  return JSON.parse(JSON.stringify(obj));
};

utils.toggleFavourite = function (clickedElement, array) {
  let id = clickedElement.getAttribute('data-id');
  if (array.includes(id)) {
    array.splice(array.indexOf(id), 1);
    clickedElement.classList.remove('favorite');
  } else {
    array.push(id);
    clickedElement.classList.add('favorite');
  }
  console.log('current array:', array);
};

utils.whatBackground = function (rating) {
  if (rating >=0 && rating < 6) {
    return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
  } else if (rating > 6 && rating <= 8) {
    return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
  } else if (rating > 8 && rating <= 9) {
    return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
  } else if (rating > 9 && rating <= 10) {
    return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
  } else {
    console.log('invalid input in whatBackground function');
  }
};

utils.whatLenght = function (rating) {
  if (rating < 0 || rating > 10) {
    console.log('invalid input in whatLenght function');
    return;
  }
  let percentage = Math.trunc(rating * 10);
  return `${percentage}%`;
};














