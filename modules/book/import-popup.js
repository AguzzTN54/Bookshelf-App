const importPopup = () => {
  const popupContent = `
    <div class="msg"> Are You sure to add around <span>${bookDummy.length} book </span> data dummy to your list ? </div>
    <div class="confirmation">
      <button class="cancel" onclick="importPopup.doImport()"> Import Now </button>
      <button class="confirm" onclick="importPopup.cancel()"> Cancel </button>
    </div>
  `;

  setState(PopUp, { content: popupContent, show: true });
};

importPopup.doImport = () => {
  bookDummy.forEach((book, i) => {
    localBook.add(book);
    if (i === bookDummy.length - 1) {
      localBook.import();
      setState(MainBooks, { books: localBook.getAll() });
    }
  });

  setState(PopUp, { show: false });
  setState(Toast, {
    msg: `<i class="ba-check"></i> ${bookDummy.length} Books have been imported !`,
  });
};

importPopup.cancel = () => {
  setState(PopUp, { show: false });
};
