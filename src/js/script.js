{
  'use strict';
  //"test:scss": "stylelint --fix src/sass/", REMOVED TEMPORARY FROM PACKAGE.JSON

  const select = {
    templateOf: {
      Book: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
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

  const favoriteBooks = [];
    
  class Book {
    constructor(data) {
      const thisBook = this;
      thisBook.data = utils.createDeepClone(dataSource.books[data]); 
      thisBook.renderInMenu();
      thisBook.getElements();
      //thisBook.initActions();

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

    initActions() {
      const thisBook = this; 
      thisBook.dom.books.addEventListener('dblclick', function (event) {
        event.preventDefault();
        let clickedElement = event.target.querySelector(select.book.id).getAttribute('data-id');//.innerHTML;
        utils.toggleFavourite(thisBook.dom.image,thisBook.data.id,favoriteBooks);
        //thisBook.dom.image.classList.toggle('favorite');
        console.log('clickedElement:', clickedElement);
      });
    }
  }
  const app = {

    initBooks: function () {
      const thisApp = this;
      //console.log('thisApp.data:', thisApp.data);
      for (let bookData in thisApp.data.books) {
        //new Product(productData, thisApp.data.products[productData]);
        new Book(bookData);
      }
    },

    initData: function () {
      const thisApp = this;
      thisApp.data = dataSource;
    },

    init: function () {
      const thisApp = this;
      console.log('*** App starting ***');
      thisApp.initData();
      //thisApp.initMenu();
      thisApp.initBooks();
      thisApp.initActions();
    },

    initActions: function () {

      console.log('app.initActions');
      
      document.querySelector(select.containerOf.bookList).addEventListener('dblclick', function (event) {
        event.preventDefault();
        let clickedElement = event.target.parentNode.parentNode;
        console.log('target:', event.target);
        console.log('clickedElement:', clickedElement);
        if (clickedElement.classList.contains('book__image')) {
  
          console.log('inside if clickedElement:', clickedElement);
          utils.toggleFavourite2(clickedElement, favoriteBooks);
          //thisBook.dom.image.classList.toggle('favorite');

        }
      });
    },
  };

  app.init();
        
}

