const deletePopup = (data) => {
  deletePopup.id = data.id;
  const popupContent = `
    <div class="msg"> Are You sure to remove book with title <span>"${data.title}"</span> from your list ?</div>
    <div class="confirmation">
      <button class="confirm" onclick="deletePopup.doDelete()"> Delete Permanently </button>
      <button class="cancel" onclick="deletePopup.cancelDelete()"> Cancel </button>
    </div>
  `;

  setState(PopUp, { content: popupContent, show: true });
};

deletePopup.doDelete = () => {
  localBook.delete(deletePopup.id);
  setState(MainBooks, { books: localBook.getAll() });
  setState(PopUp, { show: false });
  setState(Toast, { msg: '<i class="ba-check"></i> Book Deleted !' });
};

deletePopup.cancelDelete = () => {
  setState(PopUp, { show: false });
};
