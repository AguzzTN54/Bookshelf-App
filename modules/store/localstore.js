const localBook = {
  getAll() {
    const result = this._getParsed().data.reverse();
    result.sort((a, b) => {
      if (a.lastModified < b.lastModified) return 1;
      if (a.lastModified > b.lastModified) return -1;
      return 0;
    });
    return result;
  },

  _getParsed() {
    const books = localStorage.getItem('books');
    const parsedBook = books ? JSON.parse(books) : { data: [] };
    return parsedBook;
  },

  add(bookObj) {
    const { data } = this._getParsed();
    bookObj.id = data.length + 1;
    if (bookObj.isComplete === undefined) bookObj.isComplete = false;
    data.lastModified = new Date().toISOString();
    data.push(bookObj);
    localStorage.setItem('books', JSON.stringify({ data }));
  },

  edit(id, obj) {
    const { data } = this._getParsed();
    const targetIndex = data.findIndex((d) => id === d.id);
    Object.keys(obj).forEach((key) => {
      data[targetIndex][key] = obj[key];
    });
    data[targetIndex].lastModified = new Date().toISOString();
    localStorage.setItem('books', JSON.stringify({ data }));
  },
};
