import { getSortedComics } from './api-service';
import { hideSpinner, showSpinner } from './spinner';
import { createMarkupCard } from './utils/create-card-markup';
import { refs } from './utils/refs';

refs.formatSelect.addEventListener('change', onChangeSelect);
refs.selectOrderBy.addEventListener('change', onChangeSelect);
refs.queryInput.addEventListener('input', _.debounce(onChangeQuery, 300));

function onChangeQuery(e) {
  refs.sortedComicsList.innerHTML = '';
  sendInfo();
}

function onChangeSelect(e) {
  refs.sortedComicsList.innerHTML = '';
  sendInfo();
}

async function sendInfo() {
  const query = refs.queryInput.value;
  const format = refs.formatSelect.value;
  const orderBy = refs.selectOrderBy.value;

  const { data: results } = await getSortedComics(format, query, orderBy);

  refs.sortedComicsList.insertAdjacentHTML(
    'beforeend',
    createMarkupCard(results)
  );
}
