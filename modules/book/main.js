const mainBookState = {
  bookCount: 0,
  unfinished: 0,
  books: [],
};

const MainBooks = () => {
  const { query } = Header.state;
  const { books, unfinished } = MainBooks.state;
  let pageTitle = `
      You have <span>
        ${unfinished}
        Book${unfinished > 0 ? 's' : ''}
      </span> to read
    `;

  if (query.length > 0)
    pageTitle = `
      Discovering <span>${books.length} </span> result for <span> "${query}" </span>
    `;

  return `
    <h2> ${pageTitle} </h2>
    
    <book-list class="unfinished" type="unfinished">
    </book-list>

    <book-list class="finished" type="finished">
    </book-list>
  `;
};

const mainBookHandler = {
  set: function (state, key, value) {
    if (key === 'books') {
      const unfinished = value.filter(({ isComplete }) => !isComplete);
      const finished = value.filter(({ isComplete }) => isComplete);
      state.books = value;
      state.bookCount = value.length;
      state.unfinished = unfinished.length;

      $('.container .left').innerHTML = MainBooks();
      $('book-list.unfinished').books = unfinished;
      $('book-list.finished').books = finished;
      return;
    }
  },
};

MainBooks.state = new Proxy(mainBookState, mainBookHandler);
