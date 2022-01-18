const mainBookState = {
  bookCount: 0,
  unfinished: 0,
  books: [],
};

const MainBooks = () => {
  return `
    <h2> You have
      <span> ${MainBooks.state.unfinished}
      Book${MainBooks.state.unfinished > 0 ? 's' : ''}
      </span>
      to read
    </h2>
    
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
