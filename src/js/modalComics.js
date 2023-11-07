import { format } from 'date-fns/esm';
import { getComicsById, getImgAuthors } from './api-service';

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
    const {
      data: { results },
    } = await getComicsById(id);
    openModal();
    modalMarkup.insertAdjacentHTML('beforeend', createModalMarkup(results[0]));
  } catch (error) {
    console.error(error);
  }
}

function createModalMarkup(results) {
  console.log(results);
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
  function creatorsMarkup(creators) {}
  return `
  <div>
  <img src=${thumbnail.path}.${thumbnail.extension} />
  <div>
  <h3>${title}</h3>
  <p>${creators[0].name}</p>
  <p>${date}</p>
  <p>${description}</p>
  <ul> 
  <li>
  <p>Format</p>
  <p>${formatComics}</p> 
  </li>
  <li>
  <p>Year released</p>
  <p>${yearReleased}</p>
  </li>
  <li>
  <p>Pages</p>
  <p>${pageCount}</p>
  </li>
  <li>
  <p>Price</p>
  <p>${prices[0].price}</p>
  </li>
  </ul>
  <ul>
  ${getImgAuthors(id)}
  </ul>
  </div>
  </div>
  
  `;
}
