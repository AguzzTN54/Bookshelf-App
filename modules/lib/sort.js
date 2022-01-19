const sortByLatestModified = (array) => {
  return array.sort((a, b) => {
    if (a.lastModified < b.lastModified) return 1;
    if (a.lastModified > b.lastModified) return -1;
    return 0;
  });
};

const sortByLatestAdded = (array) => {
  return array.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  });
};

const sortByTitle = (array) => {
  return array.sort((a, b) => {
    if (a.title < b.title) return 1;
    if (a.title > b.title) return -1;
    return 0;
  });
};

const sortByYear = (array) => {
  return array.sort((a, b) => {
    if (a.year < b.year) return 1;
    if (a.year > b.year) return -1;
    return 0;
  });
};

const sortByAuthor = (array) => {
  return array.sort((a, b) => {
    if (a.author < b.author) return 1;
    if (a.author > b.author) return -1;
    return 0;
  });
};
