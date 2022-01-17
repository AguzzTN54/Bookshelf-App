const appState = {};

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
        <div class="addbook">
          <h2 style="text-align: center">Add New Book</h2>
          <form action="">
            <div class="form-group">
              <label for="title">Book Title</label>
              <input
                type="text"
                name="book"
                id="title"
                placeholder="Fantastic Beast and Where to Find Them"
                required
              />
            </div>
            <div class="form-group">
              <label for="author">Author</label>
              <input
                type="text"
                name="author"
                id="author"
                placeholder="JK. Rowling"
                required
              />
            </div>
            <div class="form-group">
              <label for="isbn">ISBN</label>
              <input
                type="text"
                name="isbn"
                id="isbn"
                placeholder="(Optional)"
              />
            </div>
            <div class="form-group">
              <label for="year">Year</label>
              <input
                type="number"
                name="year"
                id="year"
                placeholder="2009"
                required
              />
            </div>
            <div class="form-group">
              <input type="checkbox" name="finish" id="finish" />
              <label
                for="finish"
                style="position: relative; padding-left: 2rem"
              >
                <div class="checkmark"></div>
                <span style="color: initial"> Finished Reading ?</span>
              </label>
            </div>
            <div class="form-group" style="text-align: center">
              <input type="submit" value="Add to Bookshelf" />
            </div>
          </form>
        </div>
      </div>
    </div>`;
};

const appHandler = {
  set: function (state, key, value) {},
};

App.state = new Proxy(appState, appHandler);
$('section').innerHTML = App();

setState(MainBooks, { books: bookDummy });
