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
      this._type === 'unfinished'
        ? 'No Book to read, <br/> You can <span> Add More Book</span>'
        : 'No Book to show, <br/> You can <span> Read More Book </span>';
    bookContainer.innerHTML = `
      <div class="empty"> ${msg} </div>
    `;
  }

  _filter(filterby) {
    if (filterby === 'lastModified')
      this._books = sortByLatestModified(this._books);
    if (filterby === 'latest') this._books = sortByLatestAdded(this._books);
    if (filterby === 'title') this._books = sortByTitle(this._books);
    if (filterby === 'author') this._books = sortByAuthor(this._books);
    if (filterby === 'year') this._books = sortByYear(this._books);
    if (filterby === 'reverse') this._books = this._books.reverse();
    this._pageActive = 1;
    this._showBookList();
    window.addEventListener('resize', this._setListContainerHeight.bind(this));
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
      <div class="top">
        <h3>
          ${heading}
        </h3>
        <div class="filter">
          <button class="selected"> <i class="ba-filter"></i> Last Modified </button>
          <button class="reverse"> <i class="ba-reverse"></i> </button>
          <div class="option">
            <a data-filterby="lastModified"> Last Modified </a>
            <a data-filterby="latest"> Recently Added </a>
            <a data-filterby="title"> Title </a>
            <a data-filterby="author"> Author </a>
            <a data-filterby="year"> Year </a>
          </div>
        </div>
      </div>
      <div class="list">
        <ul class="book-list">
        </ul>
      </div>

      <div class="pagination">
        <ul></ul>
      </div>`;

    this._events();
  }

  _events() {
    const toggle = (act) => {
      const div = this.querySelector('.option');
      if (act === 'close') div.classList.remove('show');
      else div.classList.toggle('show');
    };

    const selected = this.querySelector('.selected');
    selected.addEventListener('click', toggle);

    this.querySelectorAll('.option a').forEach((target) => {
      const filterby = target.getAttribute('data-filterby');
      const text = target.innerText;
      target.addEventListener('click', () => {
        selected.innerHTML = `<i class="ba-filter"></i> ${text}`;
        toggle();
        this._filter(filterby);
      });
    });

    this.querySelector('.reverse').addEventListener('click', () => {
      this._filter('reverse');
    });

    this.addEventListener('click', (e) => {
      if (!e.target.classList.contains('selected')) toggle('close');
    });
  }
}

customElements.define('book-list', BookList);
