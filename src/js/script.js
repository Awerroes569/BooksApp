{
  'use strict';
  //"test:scss": "stylelint --fix src/sass/", REMOVED TEMPORARY FROM PACKAGE.JSON

  const select = {
    templateOf: {
      Book: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
      filters: '.filters',
    },
    book: {
      image: '.book__image',
      name: '.book__name',
      price: '.book__price',
      rating: '.book__rating',
      id: 'a',
    },
  };
    
  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.Book).innerHTML),
  };
  //ID's of favourite books
  const favoriteBooks = [];
  //Chosen filters
  const filters = [];
    
  class Book {
    constructor(data) {
      const thisBook = this;
      thisBook.data = utils.createDeepClone(dataSource.books[data]); 
      thisBook.renderInMenu();
      thisBook.getElements();
    }

    renderInMenu() {
      const thisBook = this;
      /* generate HTML based on template */
      const generatedHTML = templates.bookTemplate(thisBook.data);
      /* create element using utils.createElementFromHTML */
      thisBook.element = utils.createDOMFromHTML(generatedHTML);
      /* find menu container */
      const booksContainer = document.querySelector(select.containerOf.bookList);
      /* add element to menu */
      booksContainer.appendChild(thisBook.element);
    }

    getElements() {
      const thisBook = this;
      const element=thisBook.element;
      thisBook.dom = {};
      thisBook.dom.wrapper = element;
      thisBook.dom.books = document.querySelector(select.containerOf.bookList);
      thisBook.dom.image = element.querySelector(select.book.image);
      thisBook.dom.name = element.querySelector(select.book.name);
      thisBook.dom.price = element.querySelector(select.book.price);
      thisBook.dom.rating = element.querySelector(select.book.rating);      
    }
  }
  const app = {

    initBooks: function () {
      const thisApp = this;
      ////console.log('thisApp.data:', thisApp.data);
      for (let bookData in thisApp.data.books) {
        new Book(bookData);
      }
    },

    initData: function () {
      const thisApp = this;
      thisApp.data = dataSource;
    },

    init: function () {
      const thisApp = this;
      //console.log('*** App starting ***');
      thisApp.initData();
      thisApp.initBooks();
      thisApp.initActions();
    },

    initActions: function () {

      const thisApp = this;
      //console.log('app.initActions');
      
      document.querySelector(select.containerOf.bookList).addEventListener('dblclick', function (event) {
        event.preventDefault();
        let clickedElement = event.target.parentNode.parentNode;
        //console.log('target:', event.target);
        //console.log('clickedElement:', clickedElement);
        if (clickedElement.classList.contains('book__image')) {
  
          //console.log('inside if clickedElement:', clickedElement);
          utils.toggleFavourite(clickedElement, favoriteBooks);
        }
      });

      document.querySelector(select.containerOf.filters).addEventListener('click', function (event) {
        const clickedElement = event.target;
        //console.log('filters clicked:', clickedElement);

        if (clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.classList.contains('filter')) {
          //console.log('filters clickedElement:', clickedElement);
          if (clickedElement.checked) {
            filters.push(clickedElement.value);
          } else {
            filters.splice(filters.indexOf(clickedElement.value), 1);
          }
          //console.log('filters:', filters);
          thisApp.filterBooks();
        }
      });

    },

    filterBooks: function () {
      const thisApp = this;
      //const books = document.querySelectorAll(select.containerOf.bookList);
      ////console.log('books htmls:', books);
      for (let book in thisApp.data.books) {
        //let shouldBeHidden = false;
        //let conditions = [];
        ////console.log('book:',book);
        const bookImage = document.querySelector(`[data-id="${thisApp.data.books[book].id}"]`);
        //console.log('bookImage:', bookImage);
        if (!filters.length) {
          bookImage.classList.remove('hidden');
          //console.log('no filters');
          continue;
        }
        for (let filter in filters) {
          
          //console.log('filter:', filter);
          bookImage.classList.remove('hidden');  
          //console.log('before if:',bookImage.classList);
          
          //IF FILTER IS NOT IN DETAILS
          if (!thisApp.data.books[book].details[filters[filter]]) {

            //console.log('filter not in details:', filter);
            //console.log('filter value:', filters[filter]);
            bookImage.classList.add('hidden');
            //console.log('after if:', bookImage.classList);
            break; 
            
          } 
        }
      }
    },
  };

  app.init();
        
}

