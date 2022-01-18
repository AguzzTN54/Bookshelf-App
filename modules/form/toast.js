const Toast = () => {
  return `
    <div class="toast-body">
      ${Toast.state.msg || 'No message'}
    </div>
  `;
};

const toastHandler = {
  set: function (state, key, value) {
    state[key] = value;
    if (key === 'msg') {
      $('.toast').innerHTML = Toast();
    }
  },
};

Toast.state = new Proxy({ msg: '' }, toastHandler);
