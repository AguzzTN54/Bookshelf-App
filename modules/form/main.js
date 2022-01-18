const BookForm = () => {
  const { data } = BookForm.state;
  return `
    <div class="addbook ${data.id ? 'edit-form' : ''}">
      <h2 style="text-align: center">
        ${data.id ? 'Edit Book Detail' : 'Add New Book'}
      </h2>
      <form onsubmit="save(event,${data.id ? "'edit'" : "'add'"})">
        <div class="form-group">
          <label for="title">Book Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            placeholder="Fantastic Beast and Where to Find Them"
            value="${data.title || ''}"
          />
        </div>
        <div class="form-group">
          <label for="author">Author</label>
          <input
            value="${data.author || ''}"
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
            value="${data.isbn || ''}"
          />
        </div>
        <div class="form-group">
          <label for="year">Year</label>
          <input
            type="number"
            name="year"
            id="year"
            required
            placeholder="2009"
            value="${data.year || ''}"
          />
        </div>
        <div class="form-group">
          <input type="checkbox" name="isComplete" id="isComplete" ${
            data.isComplete ? 'checked' : ''
          } />
          <label
            for="isComplete"
            style="position: relative; padding-left: 2rem"
          >
            <div class="checkmark"></div>
            <span style="color: initial"> Finished Reading ?</span>
          </label>
        </div>
        <div class="form-group" style="text-align: center">
          ${
            data.id
              ? `<button type="submit" class="save">
                  <i class="ba-edit-o" style="line-height: 0; padding-right: .3rem"></i>
                  Save Changes
                </button>
                <button class="cancel" onclick="cancel()"> Cancel </button>`
              : `<button type="submit">
                  <i class="ba-plus-o" style="line-height: 0; padding-right: .3rem"></i>
                  Add to Bookshelf
                </button>`
          }
        </div>
      </form>
    </div>`;
};

const save = (e, mode) => {
  e.preventDefault();

  const dataToSave = {};
  const form = new FormData(e.target);
  form.forEach((value, key) => {
    if (key === 'isComplete') value = true;
    if (key === 'year') value = parseInt(value);
    dataToSave[key] = value;
  });
  if (!('isComplete' in dataToSave)) dataToSave.isComplete = false;

  if (mode === 'edit') localBook.edit(BookForm.state.data.id, dataToSave);
  else localBook.add(dataToSave);
  setState(BookForm, { data: {} });
  setState(MainBooks, {
    books: localBook.getAll().map((item, i) => {
      if (i === 0) item.new = 'true';
      return item;
    }),
  });
};

const cancel = () => {
  const bookListNum = $(`#book${BookForm.state.data.id}`);
  setState(BookForm, { data: {} });
  if (bookListNum) bookListNum.classList.remove('editing');
};

const bookformState = { data: {} };
const bookformHandler = {
  set: function (state, key, value) {
    state[key] = value;
    if (key === 'data') {
      $('.container .right').innerHTML = BookForm();
    }
  },
};

BookForm.state = new Proxy(bookformState, bookformHandler);
