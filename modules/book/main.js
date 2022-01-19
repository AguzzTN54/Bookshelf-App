const mainBookState = {
  bookCount: 0,
  unfinished: 0,
  query: '',
  fromQuery: false,
  books: [],
};

const MainBooks = () => {
  const { bookCount, unfinished, query } = MainBooks.state;
  let pageTitle = `
      You have <span>
        ${unfinished}
        Book${unfinished > 0 ? 's' : ''}
      </span> to read
    `;

  if (query.length > 0)
    pageTitle = `
      Discovering <span>${bookCount} </span> result for <span> "${query}" </span>
    `;

  return `
    <h2> ${pageTitle} </h2>
    
    <book-list class="unfinished" type="unfinished">
    </book-list>

    <book-list class="finished" type="finished">
    </book-list>
  `;
};

MainBooks.handler = {
  set: function (state, key, value) {
    state[key] = value;
    if (key === 'books') {
      if (!state.fromQuery && state.query.length > 0) {
        value = search(state.query, value);
      }
      const unfinished = value.filter(({ isComplete }) => !isComplete);
      const finished = value.filter(({ isComplete }) => isComplete);
      state.bookCount = value.length;
      state.unfinished = unfinished.length;

      $('.container .left').innerHTML = MainBooks();
      $('book-list.unfinished').books = unfinished;
      $('book-list.finished').books = finished;
      setState(MainBooks, { fromQuery: false });
      return;
    }

    if (key === 'query') {
      setState(MainBooks, { fromQuery: true, books: search(value) });
    }
  },
};

MainBooks.state = new Proxy(mainBookState, MainBooks.handler);
