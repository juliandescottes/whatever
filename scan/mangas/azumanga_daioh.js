window.AZUMANGA_DAIOH = {
  name: 'Azumanga daioh',
  root: 'https://www.otakusmash.com/read-manga/mangas/',
  chapters: [{
    name: 'Volumes 1 to 3',
    tpl: 'Azumanga%20Daioh/001.003%20-%20Azumanga%20Daioh%20Complete/Azumanga_Daioh_p${index}.jpg',
    pages: 689

  }, {
    name: 'Supplementary materials',
    tpl: 'Azumanga%20Daioh/001.004%20-%20Azumanga%20Daioh%20Supplementary%20Materials/azumanga${index}.jpg',
    pages: 51

  }],
  getPageUrl: function (chapterIndex, index) {
    let chapter = this.chapters[chapterIndex];
    if (index < chapter.pages) {
      var padLength = chapterIndex === 0 ? 3 : 2;
      if (chapterIndex === 0 && index === 0) {
        return this.root + 'Azumanga%20Daioh/001.003%20-%20Azumanga%20Daioh%20Complete/Azumanga_Daioh_cover.jpg';
      } else if (chapterIndex === 0) {
        return this.root + chapter.tpl.replace('${index}', padNumber(index, padLength));
      } else {
        return this.root + chapter.tpl.replace('${index}', padNumber(index + 1, padLength));
      }
    }
    return false;
  }
};
