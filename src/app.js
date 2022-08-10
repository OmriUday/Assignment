// Static Data
const db = {
  ads: ['AD__INDEX__', 'ADVERTISEMENT'],
  pageData: {
    id: 'page_id___PG__',
    title: 'title_page__PG__',
    text: 'text_page__PG__',
  },
};
const main = document.querySelector('main');

// Ads Class
class Ads {
  constructor() {
    this.usedAds = [];
    this.adIndex = 0;
  }

  render(size, isLast) {
    const new_ad = document.createElement('div');
    new_ad.classList.add('section');
    new_ad.classList.add('ads');
    this.adIndex += 1;
    new_ad.id = db.ads[0].replace('__INDEX__', this.adIndex);
    new_ad.innerHTML = `<h6>${db.ads[1]}</h6>`;
    const width_height = size ? size : [300, 250];
    new_ad.setAttribute(
      'style',
      `width:${width_height[0]}px;
      height:${width_height[1]}px;
      `,
    );
    return new_ad;
  }

  used(ad) {
    this.usedAds.push(ad);
  }

  stats() {
    console.log(this.usedAds);
    console.log(this.adIndex);
  }
}

// App Class
class App {
  constructor() {
    this.ads = new Ads();
    this.renderedPages = [];
    this.pageIndex = 1;
  }

  renderPages(totalPages) {
    for (let i = 0; i < totalPages; i++) {
      const new_page = document.createElement('article');
      new_page.classList.add('section');
      new_page.id = db.pageData.id.replace('PG', i);
      new_page.innerHTML = `<article><h1>${db.pageData.title.replace(
        'title_page__PG__',
        `Title Page ${i}`,
      )}</h1> <p>${db.pageData.text.replace(
        'text_page__PG__',
        `Text Page ${i}`,
      )}</p></article>`;
      this.pageIndex += 1;
      this.ads.adIndex += 1;
      main.appendChild(new_page);
      if (this.pageIndex % 2 === 0) {
        if (this.ads.adIndex % 2 === 0) {
          main.appendChild(this.ads.render([300, 250], false));
        } else {
          main.appendChild(this.ads.render([320, 100], false));
        }
      }
      this.ads.used(new_page);
      if (i === totalPages - 1) {
        const res = this.ads.render([300, 600], true);
        this.ads.used(res);
        main.appendChild(this.ads.render([300, 600], true));
        this.ads.stats();
      }
    }
  }
}

const runApp = new App();
runApp.renderPages(8);

// define all UI variable
const navToggler = document.querySelector('.nav-toggler');
const navMenu = document.querySelector('.site-navbar ul');
const navLinks = document.querySelectorAll('.site-navbar a');

// load all event listners
allEventListners();

// functions of all event listners
function allEventListners() {
  // toggler icon click event
  navToggler.addEventListener('click', togglerClick);
  // nav links click event
  navLinks.forEach((elem) => elem.addEventListener('click', navLinkClick));
}

// togglerClick function
function togglerClick() {
  navToggler.classList.toggle('toggler-open');
  navMenu.classList.toggle('open');
}

// navLinkClick function
function navLinkClick() {
  if (navMenu.classList.contains('open')) {
    navToggler.click();
  }
}

const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
