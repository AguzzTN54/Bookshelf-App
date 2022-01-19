const appState = {
  isLoaded: false,
};

const App = () => {
  return `
    <div class="popup"> </div>
    <header>${Header()}</header>

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
