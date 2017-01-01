function padNumber(num, length) {
  var padding = new Array(length).join('0');
  return (padding + num).slice(-length);
}


function createUsagiChapter(name , pages) {
  let tpl = 'Usagi%20Drop/' + name + '/Usagi-Drop-Manga-${index}.jpg';
  return {name, pages, tpl};
}

const MANGAS = {
  'USAGI_DROP': {
    name: 'Usagi drop',
    root: 'https://www.otakusmash.com/read-manga/mangas/',
    chapters: [
      createUsagiChapter('001', 33),
      createUsagiChapter('002', 33),
      createUsagiChapter('003', 35),
      createUsagiChapter('004', 32),
      createUsagiChapter('005', 34),
      createUsagiChapter('006', 38),
      createUsagiChapter('007', 35),
      createUsagiChapter('008', 36),
      createUsagiChapter('009', 33),
      createUsagiChapter('010', 35),
      createUsagiChapter('011', 38),
      createUsagiChapter('012', 39),
      createUsagiChapter('013.018 - Volume 3', 228),
      createUsagiChapter('019.024 - Volume 4', 216),
      createUsagiChapter('025.030 - Volume 5', 233),
      createUsagiChapter('031.036 - Volume 6', 230),
      createUsagiChapter('037.042 - Volume 7', 223),
      createUsagiChapter('043.049 - Volume 8', 219),
      createUsagiChapter('050.056 - THE END - FINITO - THATS ALL FOLKS', 214),
      createUsagiChapter('057 - Vol 10.01', 35),
      createUsagiChapter('058 - Vol 10.02', 38),
      createUsagiChapter('059', 36),
      createUsagiChapter('060', 26),
      createUsagiChapter('061', 32),
      createUsagiChapter('062', 37),

    ],
    getPageUrl: function (chapterIndex, index) {
      let chapter = this.chapters[chapterIndex];
      if (index < chapter.pages) {
        return this.root + chapter.tpl.replace('${index}', padNumber(index + 1, 3));
      }
      return false;
    }
  }
}

let manga = MANGAS.USAGI_DROP;
let index = 0;
let chapterIndex = 0;

let imageElement;
let navigationElement;

function onHashChange() {
  if (!window.location.hash.includes('-')) {
    return;
  }

  [chapterIndex, index] = window.location.hash.substr(1).split('-');
  chapterIndex = chapterIndex * 1;
  index = index * 1;

  let url = manga.getPageUrl(chapterIndex, index);
  imageElement.setAttribute('src', url);
  updateSelectedChapter();
}

window.addEventListener('hashchange', onHashChange);

function nextPage() {
  index++;
  let url = manga.getPageUrl(chapterIndex, index);
  if (!url) {
    index = 0;
    chapterIndex++;
    url = manga.getPageUrl(chapterIndex, index);
  }

  window.location.hash = chapterIndex + '-' + index;
  imageElement.setAttribute('src', url);
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
  window.location.hash = chapterIndex + '-' + index;
}

function updateSelectedChapter() {
  let selectedChapter = document.getElementById('chapter-' + chapterIndex);
  if (document.querySelector('.selected-chapter')) {
    document.querySelector('.selected-chapter').classList.remove('selected-chapter');
  }
  selectedChapter.classList.add('selected-chapter');
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    nextPage();
  } else if (e.key === 'ArrowLeft') {
    previousPage();
  }
});

window.addEventListener('click', (e) => {
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
  navigationElement = document.getElementById('navigation');

  for (let i = 0; i < manga.chapters.length ; i++) {
    let chapter = manga.chapters[i];
    let link = document.createElement('li');
    link.innerHTML = '<a id="chapter-' + i + '" href="#' + i + '-0">' + chapter.name + '</a>'
    navigationElement.appendChild(link);
  }

  if (window.location.hash.split('-').length === 2) {
    onHashChange();
  }
});