const ConfirmDelete = () => {
  return `
    <div class="popup-content">
      <div class="popup-container">
        <div class="msg"> Are You sure to remove book with title <span>"${ConfirmDelete.state.data.title}"</span> from your list ?</div>
        <div class="confirmation">
          <button class="confirm" onclick="doDelete()"> Delete Permanently </button>
          <button class="cancel" onclick="cancelDelete()"> Cancel </button>
        </div>
      </div>
    </div>`;
};

const doDelete = () => {
  localBook.delete(ConfirmDelete.state.data.id);
  setState(MainBooks, { books: localBook.getAll() });
  setState(ConfirmDelete, { show: false });
  setState(Toast, { msg: '<i class="ba-check"></i> Book Deleted !' });
};

const cancelDelete = () => {
  setState(ConfirmDelete, { show: false });
};

const popupState = { show: false, data: { title: '', id: '' } };
const popupHandler = {
  set: function (state, key, value) {
    state[key] = value;
    if (key === 'show') {
      if (value) $('.popup').innerHTML = ConfirmDelete();
      else $('.popup').innerHTML = '';
    }
  },
};

ConfirmDelete.state = new Proxy(popupState, popupHandler);
