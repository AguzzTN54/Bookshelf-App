const resetPopup = (data) => {
  resetPopup.id = data.id;
  const popupContent = `
    <div class="msg"> Are You sure to <span>Wipe Out All Data</span> from your list?</div>
    <div class="confirmation">
      <button class="confirm" onclick="resetPopup.doReset()"> Wipe Data </button>
      <button class="cancel" onclick="resetPopup.cancelReset()"> Cancel </button>
    </div>
  `;

  setState(PopUp, { content: popupContent, show: true });
};

resetPopup.doReset = () => {
  localBook.clear();
  setState(MainBooks, { books: [] });
  setState(PopUp, { show: false });
  setState(Toast, { msg: '<i class="ba-check"></i> Books Cleared !' });
};

resetPopup.cancelReset = () => {
  setState(PopUp, { show: false });
};
