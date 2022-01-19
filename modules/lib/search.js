const search = (query, obj) => {
  const books = typeof obj === 'object' ? obj : localBook.getAll();
  if (query.length < 1) return books;

  const filteredBook = books.filter(({ title, author, isbn }) => {
    const findTitle = title.toLowerCase().indexOf(query) > -1;
    const findAuthor = author.toLowerCase().indexOf(query) > -1;
    const findISBN = isbn.toLowerCase().indexOf(query) > -1;
    return findTitle || findAuthor || findISBN;
  });

  const highlight = filteredBook.map((item) => {
    item.title = highlighter(item.title, query);
    item.author = highlighter(item.author, query);
    return item;
  });

  return highlight;
};

const highlighter = (string, query) => {
  return string.replace(new RegExp(`(${query})`, 'gi'), '<span>$1</span>');
};
