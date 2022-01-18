const localBook = {
  getAll() {
    const { data } = this._getParsed();
    return data.reverse();
  },

  _getParsed() {
    const books = localStorage.getItem('books');
    const parsedBook = books ? JSON.parse(books) : { data: [] };
    return parsedBook;
  },

  add(bookObj) {
    const { data } = this._getParsed();
    bookObj.id = Math.floor(Math.random() * (9999999999 - 999 + 1) + 999);
    if (bookObj.isComplete === undefined) bookObj.isComplete = false;
    bookObj.lastModified = new Date().toLocaleString();
    bookObj.date = new Date().toLocaleString();
    data.push(bookObj);
    localStorage.setItem('books', JSON.stringify({ data }));
  },

  edit(id, obj) {
    const { data } = this._getParsed();
    const targetIndex = data.findIndex((d) => id === d.id);
    Object.keys(obj).forEach((key) => {
      data[targetIndex][key] = obj[key];
    });
    data[targetIndex].lastModified = new Date().toLocaleString();
    localStorage.setItem('books', JSON.stringify({ data }));
  },

  delete(id) {
    const { data } = this._getParsed();
    const targetIndex = data.findIndex((d) => d.id === id);
    if (targetIndex > -1) data.splice(targetIndex, 1);
    localStorage.setItem('books', JSON.stringify({ data }));
  },
};
