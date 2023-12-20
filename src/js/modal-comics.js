import { format } from 'date-fns/esm';
import { getAuthors, getCharacters, getComicsById } from './api-service';
import { hideSpinner, showSpinner } from './spinner';
import { refs } from './utils/refs';

refs.listComics.addEventListener('click', onClickComics);

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
  refs.modal.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
  refs.modal.addEventListener('click', clickOnBackdrop);
  window.addEventListener('keydown', onEscapeKeyDown);
  refs.closeModalBtn.addEventListener('click', closeModal);
}

function closeModal() {
  refs.modal.classList.add('is-hidden');
  document.body.style.overflow = '';
  refs.modal.removeEventListener('click', clickOnBackdrop);
  window.removeEventListener('keydown', onEscapeKeyDown);
  refs.closeModalBtn.removeEventListener('click', closeModal);
}

async function onClickComics(evt) {
  try {
    evt.preventDefault();
    if (!evt.target.closest('.comics-link')) {
      return;
    }
    showSpinner();
    const id = evt.target.closest('.comics-link').dataset.id;
    const results = await Promise.all([
      getComicsById(id),
      getCharacters(id),
      getAuthors(id),
    ]);
    hideSpinner();
    const comics = results[0].results[0];
    const characters = results[1].results;
    const creators = results[2].results;

    openModal();
    refs.modalMarkup.innerHTML = createModalMarkup(comics);

    const creatorList = document.querySelector('.comics__authors-list');

    const characterList = document.querySelector('.comics__characters-list');

    creatorList.insertAdjacentHTML('beforeend', creatorsMarkup(creators));

    characterList.insertAdjacentHTML('beforeend', charactersMarkup(characters));
  } catch (error) {
    console.error(error);
  }
}

function creatorsMarkup(creators) {
  return creators
    .map(
      ({ fullName, thumbnail }) =>
        `<li class="comics__item">
        <img class="comics-list__img " src="${thumbnail.path}.${thumbnail.extension}" />
        <p class="comics__item-name">${fullName}</p>
  </li>`
    )
    .join('');
}

function charactersMarkup(characters) {
  return characters
    .map(
      ({ thumbnail, name }) =>
        `
    <li class="comics__item">
      <img class="comics-list__img " src=${thumbnail.path}.${thumbnail.extension} />
      <p class="comics__item-name">${name}</p>
    </li>
    `
    )
    .join('');
}

function createModalMarkup({
  thumbnail,
  title,
  creators: { items: creators },
  dates,
  description,
  format: formatComics,
  pageCount,
  prices,
}) {
  if (!description) {
    description = 'Sorry the author of this comic did not add a description.';
  }

  const date = format(new Date(dates[0].date), 'MMMM dd, yyyy');
  const yearReleased = new Date(dates[0].date).getFullYear();
  return `
  <div class="comics">
  <img class="comics__img" src=${thumbnail.path}.${thumbnail.extension} />
  <div class="comics__container">
   <h3 class="comics__title comics__title--not-margin">${title}</h3>
     <div class="comics__text-wrapper">
         <p class="comics__created comics__created--border">${creators[0].name}</p>
         <p class="comics__created">${date}</p>
      </div>
  <p class="comics__description">${description}</p>
  <ul class="comics__info-list"> 
  <li>
  <p class="comics__info-title">Format</p>
  <p class="comics__info-text comics__info-text--format">${formatComics}</p> 
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
  <h3 class="comics__title">Creators</h3>
  <ul class="comics__authors-list"></ul>
  <h3 class="comics__title">Characters</h3>
  <ul class="comics__characters-list"></ul>
  </div>
  </div>
  `;
}
