class BookList extends HTMLElement {
  constructor() {
    super();
    this._itemPerPage = 0;
    this._pageActive = 1;
    this._books = [];
  }

  _getPageContent() {
    const dataToShow = this._books.filter((v, i, arr) => {
      const startNum = (this._pageActive - 1) * this._itemPerPage;
      const endNum = startNum + this._itemPerPage;
      return i >= startNum && i < endNum;
    });
    this._pagination();
    return dataToShow;
  }

  _pagination() {
    const totalPage = Math.ceil(this._books.length / this._itemPerPage);
    const pagingContainer = this.querySelector('.pagination ul');
    pagingContainer.innerHTML = '';
    for (let i = 1; i <= totalPage; i++) {
      const active = this._pageActive === i;
      const pageNumber = document.createElement('button');
      if (active) pageNumber.classList.add('active');
      pageNumber.innerText = i;
      const li = document.createElement('li');
      li.append(pageNumber);
      pagingContainer.append(li);
      pageNumber.addEventListener('click', () => {
        this._pageActive = i;
        this._showBookList();
      });
    }
  }

  _showBookList() {
    const bookContainer = this.querySelector('.book-list');
    bookContainer.innerHTML = '';

    const dataToShow = this._getPageContent();

    // If No book, show message
    if (dataToShow.length === 0) return this._emptyBook();

    // show Book
    dataToShow.forEach((data) => {
      const li = document.createElement('li');
      const bookItem = document.createElement('book-item');
      bookItem.book = data;
      li.append(bookItem);
      bookContainer.append(li);
    });
  }

  _setListContainerHeight() {
    const list = this.querySelector('.list');
    const count =
      window.innerWidth > 755 ? parseInt(list.clientHeight / 40) : 6;
    const oldItemPerPage = this._itemPerPage;
    const newItemPerPage = count < 1 ? 1 : count;
    if (oldItemPerPage !== newItemPerPage) {
      this._itemPerPage = newItemPerPage;
      this._pageActive = 1;
      this._showBookList();
    }
  }

  _emptyBook() {
    const bookContainer = this.querySelector('.book-list');
    const msg =
      this._type === 'unfinished' ? 'Add More Book' : 'Read More Book';
    bookContainer.innerHTML = `
      <div class="empty">
        No Book to show, <br/> You can <span>${msg}</span>
      </div>
    `;
  }

  connectedCallback() {
    this._type = this.getAttribute('type');
    this.render();
    this._setListContainerHeight();
    window.addEventListener('resize', this._setListContainerHeight.bind(this));
  }

  set books(data) {
    this._books = data;
    this._showBookList();
    window.addEventListener('resize', this._setListContainerHeight.bind(this));
  }

  render() {
    const heading =
      this._type.charAt(0).toUpperCase() +
      this._type.slice(1, this._type.length);

    this.innerHTML = `
      <h3>
        ${heading}  
      </h3>
      <div class="list">
        <ul class="book-list">
        </ul>
      </div>

      <div class="pagination">
        <ul></ul>
      </div>`;
  }
}

customElements.define('book-list', BookList);
