class BookItem extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set book(book) {
    this._book = book;
    this.render();
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
  }
}

customElements.define('book-item', BookItem);
