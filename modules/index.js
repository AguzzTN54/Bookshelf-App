const $ = (selector) => document.querySelector(selector);
const setState = (component, obj) => {
  const keys = Object.keys(obj);
  return keys.forEach((key) => {
    component.state[key] = obj[key];
  });
};

const scripts = [
  'store/localstore',
  'form/toast',
  'form/popup-delete',
  'book/book-dummy',
  'header',
  'book/sort',
  'book/book-item',
  'book/book-list',
  'form/main',
  'book/main',
  'app',
];

let scCountTmp = 0;
scripts.forEach((script, i) => {
  const newScript = document.createElement('script');
  newScript.src = `./modules/${script}.js`;
  document.body.append(newScript);

  newScript.addEventListener('load', () => {
    scCountTmp++;
    // Show App UI when all scripts are already load
    if (scCountTmp === scripts.length) App.state.isLoaded = true;
  });
});
