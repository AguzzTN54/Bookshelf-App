const localBook = {
  getAll() {
    const books = localStorage.getItem('books');
    const parsedBook = books ? JSON.parse(books) : { data: [] };
    return parsedBook;
  },

  add(bookObj) {
    const { data } = this.getAll();
    bookObj.id = data.length + 1;
    if (bookObj.isComplete === undefined) bookObj.isComplete = false;
    data.push(bookObj);
    localStorage.setItem('books', JSON.stringify({ data }));
  },
};