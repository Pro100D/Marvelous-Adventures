import { format } from 'date-fns/esm';
import { getCharacters, getComicsById, getInfoAuthors } from './api-service';

const listComics = document.querySelector('.last-comics-wrapper');
const modal = document.querySelector('.pop-up-comics__backdrop');
const modalMarkup = document.querySelector('.pop-up-comics__modal');

listComics.addEventListener('click', onClickComics);

function clickOnBackdrop(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal();
  }
}

function onEscapeKeyDown(evt) {
  if ((evt.code = 'ESCAPE')) {
    closeModal();
  }
}

function openModal() {
  modal.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
  modal.addEventListener('click', clickOnBackdrop);
  window.addEventListener('keydown', onEscapeKeyDown);
}

function closeModal() {
  modal.classList.add('is-hidden');
  document.body.style.overflow = '';
  modal.removeEventListener('click', clickOnBackdrop);
  window.removeEventListener('keydown', onEscapeKeyDown);
  modalMarkup.innerHTML = '';
}

async function onClickComics(evt) {
  try {
    evt.preventDefault();
    if (!evt.target.closest('.comics-link')) {
      return;
    }
    const id = evt.target.closest('.comics-link').dataset.id;
    const { results } = await getComicsById(id);
    console.log(results);
    openModal();
    modalMarkup.insertAdjacentHTML('beforeend', createModalMarkup(results[0]));

    const creatorList = document.querySelector('.comics__authors-list');
    const characterList = document.querySelector('.comics__characters-list');

    const { results: characters } = await getCharacters(id);
    creatorList.insertAdjacentHTML(
      'beforeend',
      creatorsMarkup(results[0].creators.items)
    );

    characterList.insertAdjacentHTML('beforeend', charactersMarkup(characters));
  } catch (error) {
    console.error(error);
  }
}

function creatorsMarkup(creators) {
  return creators
    .map(
      ({ name, role }) =>
        `<li>
    <p>${name}</p>
    <p>${role}</p>
  </li>`
    )
    .join('');
}

function charactersMarkup(characters) {
  return characters
    .map(
      ({ thumbnail, name }) =>
        `
    <li>
      <img class="characters-list__img" src=${thumbnail.path}.${thumbnail.extension} />
      <p>${name}</p>
    <li/>
    `
    )
    .join('');
}

function createModalMarkup(results) {
  const {
    thumbnail,
    title,
    creators: { items: creators },
    dates,
    description,
    format: formatComics,
    pageCount,
    id,
    prices,
  } = results;

  const date = format(new Date(dates[0].date), 'MMMM dd, yyyy');
  const yearReleased = new Date(dates[0].date).getFullYear();

  return `
  <div class="comics">
  <img class="comics__img-characters" src=${thumbnail.path}.${thumbnail.extension} />
  <div class="comics__container">
   <h3 class="comics__title">${title}</h3>
  <div>
      <p class="comics__create">${creators[0].name}</p>
      <p class="comics__create">${date}</p>
  <div />
  <p class="comics__description">${description}</p>
  <ul class="comics__info-list"> 
  <li>
  <p class="comics__info-title">Format</p>
  <p class="comics__info-text">${formatComics}</p> 
  </li>
  <li>
  <p class="comics__info-title">Year released</p>
  <p class="comics__info-text">${yearReleased}</p>
  </li>
  <li>
  <p class="comics__info-title">Pages</p>
  <p class="comics__info-text">${pageCount}</p>
  </li>
  <li>
  <p class="comics__info-title">Price</p>
  <p class="comics__info-text">${prices[0].price}</p>
  </li>
  </ul>
  <ul class="comics__authors-list"></ul>
  <ul class="comics__characters-list"></ul>
  </div>
  </div>
  
  `;
}
