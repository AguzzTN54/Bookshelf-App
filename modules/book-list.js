let itemPerPage = 0;

const showList = () => {
  let items = '';
  for (i = 0; i < itemPerPage; i++) {
    items += `
    <li>
      <h4>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint nobis ratione commodi vel quam vitae voluptatum obcaecati placeat asperiores laboriosam.</h4>
      <div class="info">
        <div class="author">JK Rowling</div>
        <div class="year">1990</div>
        <div class="action">
          <button class="edit">
            <i class="ba-edit"></i>
          </button>
          <button class="delete">
            <i class="ba-delete"></i>
          </button>
        </div>
      </div>
    </li>`;
  }
  document.querySelectorAll('.book-list').forEach((b) => (b.innerHTML = items));
};

const setListContainerHeight = () => {
  const list = document.querySelector('.list');
  const count = window.innerWidth > 755 ? parseInt(list.clientHeight / 42) : 6;
  itemPerPage = count < 1 ? 1 : count;
  showList();
};

window.addEventListener('resize', setListContainerHeight);
setListContainerHeight();
