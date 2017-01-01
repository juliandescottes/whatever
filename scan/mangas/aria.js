function createAriaChapter(name , pages, tpl) {
  tpl = tpl || 'Aria/' + name + '/Usagi-Drop-Manga-${index}.jpg';
  return {name, pages, tpl};
}

const USAGI_DROP = {
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
    createUsagiChapter('057 - Vol 10.01', 35,
      'Usagi%20Drop/057 - Vol 10.01/Usagi-Drop-Manga-Chapter-58-${index}.jpg'),
    createUsagiChapter('058 - Vol 10.02', 38,
      'Usagi%20Drop/058 - Vol 10.02/Usagi-Drop-Manga-Chapter-59-${index}.jpg'),
    createUsagiChapter('059', 36, 'Usagi%20Drop/059/Usagi_Drop-manga-chapter-60-${index}.jpg'),
    createUsagiChapter('060', 26, 'Usagi%20Drop/060/Usagi-Drop-manga-Chapter-61-${index}.jpg'),
    createUsagiChapter('061', 32, 'Usagi%20Drop/061/Usagi-Drop-manga-Chapter-62-${index}.jpg'),
    createUsagiChapter('062', 37, 'Usagi%20Drop/062/Usagi-Drop-manga-Chapter-63-${index}.jpg'),

  ],
  getPageUrl: function (chapterIndex, index) {
    let chapter = this.chapters[chapterIndex];
    if (index < chapter.pages) {
      return this.root + chapter.tpl.replace('${index}', padNumber(index + 1, 3));
    }
    return false;
  }
};
