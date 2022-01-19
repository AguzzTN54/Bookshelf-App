const Header = () => {
  return `
    <div class="left">
      <form onsubmit="Header.submit(event)">
        <input
          type="text"
          name="query"
          placeholder="Find Book by Title, Author or ISBN"
          autocomplete="false"
          oninput="Header.query(event)"
        />
        <button>
          <i class="ba-search"></i>
        </button>
        <button class="close" onclick="Header.clear(event)">
          <i class="ba-close"></i>
        </button>
      </form>
    </div>
    <div class="right">
      <h1>Bookshelf <span>App</span></h1>
    </div>
  `;
};

Header.submit = (event) => {
  event.preventDefault();
};

Header.query = (event) => {
  event.preventDefault();
  const query = event.target.value.trim().toLowerCase();
  setState(MainBooks, { query });

  const close = $('header form .close');
  if (query.length > 0) close.classList.add('show');
  else close.classList.remove('show');
};

Header.clear = (event) => {
  event?.preventDefault();
  $('header').innerHTML = Header();
  setState(MainBooks, { query: '' });
};
