class BookItem extends HTMLElement {
  set book(book) {
    this._book = book;
    this.setAttribute('id', `book${book.id}`);
    this.render();
    if (book.new) this.classList.add('new');
    if (BookForm.state.data.id === book.id) this.classList.add('editing');
  }

  render() {
    const { title, author, year, isComplete } = this._book;
    this.innerHTML = `
    <h4 title="${title}">${title}</h4>
      <div class="info">
        <div class="author" title="${author}">${author}</div>
        <div class="year">${year}</div>
        <div class="action">
          <button class="edit" title="Edit Detail">
            <i class="ba-edit"></i>
          </button>
          <button class="delete" title="Remove from List">
            <i class="ba-delete"></i>
          </button>
          <button
            class="check"
            title="${isComplete ? 'Read Again' : 'Finished Reading'}"
          >
            <i class="ba-${isComplete ? 'book-open' : 'check'}"></i>
          </button>
        </div>
      </div>`;
    this._events();
  }

  _events() {
    const readButton = this.querySelector('.check');
    readButton.addEventListener('click', this._changeCompleteStatus.bind(this));

    const editButton = this.querySelector('.edit');
    editButton.addEventListener('click', this._editButtonHandler.bind(this));

    const deleteButton = this.querySelector('.delete');
    deleteButton.addEventListener('click', this._deleteHandler.bind(this));
  }

  _editButtonHandler() {
    window.scrollTo(0, $('.addbook').offsetTop);
    const onEdit = $('.editing');
    if (onEdit) onEdit.classList.remove('editing');
    this.classList.add('editing');
    setState(BookForm, { data: this._book });
  }

  _changeCompleteStatus() {
    const { id, isComplete } = this._book;
    localBook.edit(id, { isComplete: !isComplete });
    setState(MainBooks, {
      books: sortByLatestModified(localBook.getAll()).map((item, i) => {
        if (i === 0) item.new = true;
        return item;
      }),
    });

    // Clear Edit Form when user check or uncheck complete status on list
    if (BookForm.state.data.id === id) setState(BookForm, { data: {} });
    return;
  }

  _deleteHandler() {
    setState(ConfirmDelete, { data: this._book, show: true });
  }
}

customElements.define('book-item', BookItem);
