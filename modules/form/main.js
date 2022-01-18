const BookForm = () => {
  return `
  <div class="addbook">
    <h2 style="text-align: center">Add New Book</h2>
      <form onsubmit="add(event, this)">
        <div class="form-group">
          <label for="title">Book Title</label>
          <input
            type="text"
            name="title"
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
          <input type="checkbox" name="isComplete" id="isComplete" />
          <label
            for="isComplete"
            style="position: relative; padding-left: 2rem"
          >
            <div class="checkmark"></div>
            <span style="color: initial"> Finished Reading ?</span>
          </label>
        </div>
        <div class="form-group" style="text-align: center">
          <button>
            <i class="ba-plus-o" style="line-height: 0; padding-right: .3rem"></i>
            Add to Bookshelf
          </button>
        </div>
      </form>
    </div>`;
};

const add = (e) => {
  e.preventDefault();

  const dataToSave = {};
  const form = new FormData(e.target);
  form.forEach((value, key) => {
    if (key === 'isComplete') {
      $(`form #${key}`).checked = false;
      value = true;
    }
    if (key === 'year') value = parseInt(value);
    $(`form #${key}`).value = '';
    dataToSave[key] = value;
  });
  localBook.add(dataToSave);
  setState(MainBooks, { books: localBook.getAll().data.reverse() });
};

const bookformState = {};
const bookformHandler = {
  set: function (state, key, value) {
    //
  },
};

BookForm.state = new Proxy(bookformState, bookformHandler);
