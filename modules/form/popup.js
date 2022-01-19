const PopUp = () => {
  return `
    <div class="popup-content">
      <div class="popup-container">
        ${PopUp.state.content}
      </div>
    </div>`;
};

const popupState = { show: false, content: '' };
PopUp.handler = {
  set: function (state, key, value) {
    state[key] = value;
    if (key === 'show') {
      if (value) $('.popup').innerHTML = PopUp();
      else $('.popup').innerHTML = '';
    }
  },
};

PopUp.state = new Proxy(popupState, PopUp.handler);
