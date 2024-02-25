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
    },
  };
    
  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.Book).innerHTML),
  };
    
  class Book {
    constructor(data) {
      const thisBook = this;
      thisBook.data = utils.createDeeperClone(dataSource.books[data]); 
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
      thisBook.dom.image = element.querySelector(select.book.image);
      thisBook.dom.name = element.querySelector(select.book.name);
      thisBook.dom.price = element.querySelector(select.book.price);
      thisBook.dom.rating = element.querySelector(select.book.rating);
        
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
    },
  };

  app.init();
        
}

