document.addEventListener('DOMContentLoaded', () => {
  const scripts = ['header', 'book-list'];
  scripts.forEach((script) => {
    const newScript = document.createElement('script');
    newScript.src = `./modules/${script}.js`;
    document.body.append(newScript);
  });
});
