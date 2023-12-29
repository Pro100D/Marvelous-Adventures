export function createMarkupCard({ results }, isSwiper) {
  if (isSwiper) {
    return results
      .map(({ thumbnail, title, id, creators }) => {
        return `
          <li class="my-swiper-slide swiper-slide" id=${id}>
         <a href="#" class="comics-link" data-id=${id}>
          <img class="comics-img" src="${thumbnail.path}.${thumbnail.extension}"/>
          </a>
          <p class="comics-title">${title}</p>
          <p class="comics-text">${creators.items[0].name}</p>
          </li>
            `;
      })
      .join('');
  }
  return results
    .map(
      ({ thumbnail, title, id }) => `
      <li id=${id}>
         <a href="#" class="comics-link" data-id=${id}>
          <img class="comics-img" src="${thumbnail.path}.${thumbnail.extension}"/>
          </a>
          <p class="comics-title">${title}</p>
        
          </li>`
    )
    .join('');
}
