//"test:scss": "stylelint --fix src/sass/", REMOVED TEMPORARY FROM PACKAGE.JSON


//const { breakStr } = require("prelude-ls");

//const { cos } = require("prelude-ls");
'use strict';
class Books {
  constructor() {
    this.thisBooks = this;
    this.select = {
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
        bar: '.book__rating__fill',
      },
    };
    this.templates = {
      bookTemplate: Handlebars.compile(document.querySelector(this.thisBooks.select.templateOf.Book).innerHTML),
    };
    this.favoriteBooks = [];
    this.filters = [];
    this.Book = this.createBookClass(this.thisBooks);
    console.log('this.Book:', this.Book);
    this.data = dataSource;  
    this.app = {

      init: function (mainInstance) {
        const thisApp = this;
        //console.log('*** App starting ***');
        thisApp.initBooks(mainInstance);
        thisApp.initActions(mainInstance);
      },

      initBooks: function (mainInstance) {
        const thisApp = this;
        console.log('thisApp:', thisApp);
        console.log('mainInstance:', mainInstance);
        for (let bookData of Object.keys(mainInstance.data.books)) {
          console.log('bookData:', bookData);
          console.log('thisApp.data.books[bookData]:', mainInstance.data.books[bookData]);
          new mainInstance.Book(bookData);
          console.log('this', this);
        }
      },

      initData: function () {
        const thisApp = this;
        thisApp.data = dataSource;
      },

      

      initActions: function (mainInstance) {

        const thisApp = this;

        document.querySelector(mainInstance.select.containerOf.bookList).addEventListener('dblclick', function (event) {
          event.preventDefault();
          let clickedElement = event.target.parentNode.parentNode;
          if (clickedElement.classList.contains('book__image')) {
            utils.toggleFavourite(clickedElement, mainInstance.favoriteBooks);
          }
        });

        document.querySelector(mainInstance.select.containerOf.filters).addEventListener('click', function (event) {
          const clickedElement = event.target;

          if (clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.classList.contains('filter')) {
            if (clickedElement.checked) {
              mainInstance.filters.push(clickedElement.value);
            } else {
              mainInstance.filters.splice(mainInstance.filters.indexOf(clickedElement.value), 1);
            }
            thisApp.filterBooks(mainInstance);
          }
        });

      },

      filterBooks: function (mainInstance) {

        for (let book in mainInstance.data.books) {

          const bookImage = document.querySelector(`[data-id="${mainInstance.data.books[book].id}"]`);

          if (!mainInstance.filters.length) {
            bookImage.classList.remove('hidden');
            continue;
          }
          for (let filter in mainInstance.filters) {
            bookImage.classList.remove('hidden');

            if (!mainInstance.data.books[book].details[mainInstance.filters[filter]]) {
              bookImage.classList.add('hidden');
              break;
            }
          }
        }
      },
    };
  }
  
  createBookClass(booksList) {
    class Book {
      constructor(data) {
        const thisBook = this;
        thisBook.data = utils.createDeepClone(dataSource.books[data]);
        thisBook.renderInMenu();
        thisBook.getElements();
        thisBook.stylingBar();
      }

      stylingBar() {
        const thisBook = this;
        const rating = thisBook.data.rating;
        const bar = thisBook.dom.bar;
        console.log('bar:', bar);
        bar.setAttribute('style', `background: ${utils.whatBackground(rating)}; width: ${utils.whatLenght(rating)};`);
      }

      renderInMenu() {
        const thisBook = this;
        const generatedHTML = booksList.templates.bookTemplate(thisBook.data);
        thisBook.element = utils.createDOMFromHTML(generatedHTML);
        const booksContainer = document.querySelector(booksList.select.containerOf.bookList);
        booksContainer.appendChild(thisBook.element);
      }

      getElements() {
        const thisBook = this;
        const element = thisBook.element;
        thisBook.dom = {};
        thisBook.dom.wrapper = element;
        thisBook.dom.books = document.querySelector(booksList.select.containerOf.bookList);
        thisBook.dom.image = element.querySelector(booksList.select.book.image);
        thisBook.dom.name = element.querySelector(booksList.select.book.name);
        thisBook.dom.price = element.querySelector(booksList.select.book.price);
        thisBook.dom.rating = element.querySelector(booksList.select.book.rating);
        console.log('thisBook.dom.rating:', thisBook.dom.rating);
        thisBook.dom.bar = element.querySelector(booksList.select.book.bar);
        console.log('thisBook.dom.bar:', thisBook.dom.bar);
      }
    }
    return Book;
  }

  init() {
    this.app.init(this.thisBooks);
  }
}

const app = new Books();
app.init();


