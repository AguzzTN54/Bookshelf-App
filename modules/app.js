const appState = {
  isLoaded: false,
};

const App = () => {
  return `
    <header>
      <div class="left">
        <form>
          <input
            type="text"
            name="query"
            placeholder="Find Book by Title, Author or ISBN"
            autocomplete="false"
          />
          <button>
            <i class="ba-search"></i>
          </button>
        </form>
      </div>
      <div class="right">
        <h1>Bookshelf <span> App</span></h1>
      </div>
    </header>

    <div class="container">
      <div class="left">
        ${MainBooks()}
      </div>
      <div class="right">
        ${BookForm()}
      </div>
    </div>

    <div class="toast">
    </div>
  `;
};

const appHandler = {
  set: function (state, key, value) {
    state[key] = value;
    if (key === 'isLoaded') {
      if (!value) return;
      $('section').innerHTML = App();
      setState(MainBooks, { books: localBook.getAll() });
    }
  },
};

App.state = new Proxy(appState, appHandler);
