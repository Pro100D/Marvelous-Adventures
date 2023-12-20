import { getSortedComics } from './api-service';
import { refs } from './utils/refs';

refs.formatSelect.addEventListener('change', onChangeComicsFormat);
refs.queryInput.addEventListener('input', _.debounce(onChangeQuery, 300));

function onChangeQuery(e) {
  sendInfo();
}

function onChangeComicsFormat(e) {
  sendInfo();
}

async function sendInfo() {
  const query = refs.queryInput.value;
  const format = refs.formatSelect.value;

  const { data } = await getSortedComics(format, query);
  console.log(data);
}
