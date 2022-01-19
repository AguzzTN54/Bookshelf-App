const Header = () => {
  return `
    <div class="left">
      <form onsubmit="Header.submit(event)">
        <input
          type="text"
          name="query"
          placeholder="Find Book by Title, Author or ISBN"
          autocomplete="false"
          oninput="Header.query(event)"
        />
        <button>
          <i class="ba-search"></i>
        </button>
      </form>
    </div>
    <div class="right">
      <h1>Bookshelf <span> App</span></h1>
    </div>
  `;
};

Header.submit = (event) => {
  event.preventDefault();
};

Header.query = (event) => {
  event.preventDefault();
  const query = event.target.value.trim().toLowerCase();
  setState(Header, { query });

  const books = localBook.getAll();
  if (query.length < 1) return setState(MainBooks, { books });

  const filteredBook = books.filter(({ title, author, isbn }) => {
    const findTitle = title.toLowerCase().indexOf(query) > -1;
    const findAuthor = author.toLowerCase().indexOf(query) > -1;
    const findISBN = isbn.toLowerCase().indexOf(query) > -1;
    return findTitle || findAuthor || findISBN;
  });

  const highlight = filteredBook.map((item) => {
    item.title = Header._highlighter(item.title, query);
    item.author = Header._highlighter(item.author, query);
    return item;
  });

  setState(MainBooks, { books: highlight });
};

Header._highlighter = (string, query) => {
  const matcher = string.match(new RegExp(query, 'gi'));
  matcher?.forEach((v) => {
    string = string.replace(v, `<span>${v}</span>`);
  });
  return string;
};

Header.handler = {
  set(state, key, value) {
    state[key] = value;
  },
};

Header.state = new Proxy({ query: '' }, Header.handler);
