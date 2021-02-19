const html = require('html-template-tag');
const faker = require('faker');

let arr = JSON.parse(window.localStorage.getItem('users'));

if (!arr) {
  arr = new Array(50).fill('').map((_) => faker.helpers.userCard());
  window.localStorage.setItem('users', JSON.stringify(arr));
}

console.log(faker.helpers.userCard());

const userlist = document.querySelector('#user-list');

let curr = window.location.hash.slice(1) * 1;

const render = () => {
  const str = `
    ${arr
      .map(
        (userObj, i) =>
          `<a href='#${i}'><li>${userObj.name}</li></a>
            ${
              curr === i
                ? `
            <ul>
              ${`<li>${userObj.phone}, ${userObj.address.city}</li>`}
            </ul>`
                : ''
            }
    `
      )
      .join('')}
  `;
  userlist.innerHTML = str;
};

render();

window.addEventListener('hashchange', () => {
  curr = window.location.hash.slice(1) * 1;
  render();
});
