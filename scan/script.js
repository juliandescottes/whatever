function padNumber(num, length) {
  var padding = new Array(length).join('0');
  return (padding + num).slice(-length);
}

const MANGAS = {
  'USAGI_DROP': window.USAGI_DROP,
  'AZUMANGA_DAIOH': window.AZUMANGA_DAIOH,
}

let index = 0;
let chapterIndex = 0;
let mangaId = 'USAGI_DROP';

let manga;
let imageElement;
let chaptersElement;
let mangasElement;

function onHashChange() {
  if (!window.location.hash.includes('-')) {
    return;
  }

  [mangaId, chapterIndex, index] = window.location.hash.substr(1).split('-');
  if (isNaN(chapterIndex)) {
    chapterIndex = 0;
  }

  if (isNaN(index)) {
    index = 0;
  }

  if (!(mangaId in MANGAS)) {
    mangaId = 'USAGI_DROP';
  }

  manga = MANGAS[mangaId.toUpperCase()];
  chapterIndex = chapterIndex * 1;
  index = index * 1;

  console.log(mangaId, chapterIndex, index);

  let url = manga.getPageUrl(chapterIndex, index);
  imageElement.setAttribute('src', url);
  console.log('url');

  updateMangas();
  updateChapters();
}

window.addEventListener('hashchange', onHashChange);

function updateMangas() {
  let options = mangasElement.querySelectorAll("option");
  for (let option of options) {
    if (option.value.toUpperCase() === mangaId.toUpperCase()) {
      option.setAttribute('selected', 'selected');
    } else {
      option.removeAttribute('selected');
    }
  }
}

function updateChapters() {
  chaptersElement.innerHTML = '';
  for (let i = 0; i < manga.chapters.length ; i++) {
    let chapter = manga.chapters[i];
    let item = document.createElement('li');
    let link = document.createElement('a');
    link.setAttribute('href', '#' + mangaId + '-' + i + '-0');
    link.innerText = chapter.name;
    if (i === chapterIndex) {
      link.classList.add('selected-chapter');
    }
    item.appendChild(link);
    chaptersElement.appendChild(item);
  }
}

function nextPage() {
  index++;
  let url = manga.getPageUrl(chapterIndex, index);
  if (!url) {
    index = 0;
    chapterIndex++;
    url = manga.getPageUrl(chapterIndex, index);
  }

  window.location.hash = [mangaId, chapterIndex, index].join('-');
}

function previousPage() {
  if (index === 0) {
    chapterIndex = Math.max(chapterIndex - 1, 0);
    let chapter = manga.chapters[chapterIndex];
    index = chapter.pages - 1;
  } else {
    index--;
  }
  let url = manga.getPageUrl(chapterIndex, index);
  window.location.hash = [mangaId, chapterIndex, index].join('-');
}

function onMangaChanged(e) {
  window.location.hash = [e.target.value, 0, 0].join('-');
}

function onImageLoaded() {
  document.body.scrollTop = 0;
}

window.addEventListener('keydown', (e) => {
  let key = e.key || e.code;
  if (key === 'ArrowRight') {
    nextPage();
  } else if (key === 'ArrowLeft') {
    previousPage();
  }
});

window.addEventListener('click', (e) => {
  if (e.target.closest('#navigation')) {
    return;
  }
  let imageRect = imageElement.getBoundingClientRect();
  let midPoint = imageRect.left + (imageRect.width / 2);
  if (e.clientX > midPoint) {
    nextPage();
  } else {
    previousPage();
  }
})

window.addEventListener('load', () => {
  imageElement = document.getElementById('scan');
  chaptersElement = document.getElementById('chapters');
  mangasElement = document.getElementById('mangas');

  mangasElement.addEventListener('change', onMangaChanged);
  imageElement.addEventListener('load', onImageLoaded);

  for (let manga in MANGAS) {
    let option = document.createElement('option');
    option.setAttribute('value', manga)
    option.innerText = manga;
    mangasElement.appendChild(option);
  }

  if (window.location.hash.split('-').length === 3) {
    onHashChange();
  }
});