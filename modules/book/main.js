const mainBookState = {
  bookCount: 0,
  unfinished: 0,
  query: '',
  fromQuery: false,
  books: [],
};

const MainBooks = () => {
  const { bookCount, unfinished, query } = MainBooks.state;
  let pageTitle =
    query.length > 0
      ? `
          Discovering <span>${bookCount} </span>
          Book${unfinished > 0 ? 's' : ''}
          for <span> "${query}" </span>
        `
      : `
          You have <span> ${unfinished}
            Book${unfinished > 0 ? 's' : ''}
          </span> to read
        `;

  const resetButton =
    bookCount > 0 && query.length === 0
      ? `
          <button class="reset">
            <i class="ba-reset"></i> Reset
          </button>
        `
      : '';

  const importButton =
    !localBook.isAlreadyImport() && query.length === 0
      ? `
          <button class="import">
            <i class="ba-import"></i> Import
          </button>
        `
      : ``;

  return `
    <div class="top">
      <h2> ${pageTitle} </h2>
      ${importButton} ${resetButton}
    </div>
    
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

      $('.reset')?.addEventListener('click', resetPopup);
      $('.import')?.addEventListener('click', importPopup);
      return;
    }

    if (key === 'query') {
      setState(MainBooks, { fromQuery: true, books: search(value) });
    }
  },
};

MainBooks.state = new Proxy(mainBookState, MainBooks.handler);
