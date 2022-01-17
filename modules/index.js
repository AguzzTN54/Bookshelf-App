const $ = (selector) => document.querySelector(selector);
const setState = (component, obj) => {
  const keys = Object.keys(obj);
  return keys.forEach((key) => {
    component.state[key] = obj[key];
  });
};

const scripts = [
  'book/book-dummy',
  'header',
  'book/book-item',
  'book/book-list',
  'book/main',
  'app',
];

window.addEventListener('DOMContentLoaded', () => {
  scripts.forEach((script) => {
    const newScript = document.createElement('script');
    newScript.src = `./modules/${script}.js`;
    document.body.append(newScript);
  });
});
