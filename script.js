const data = {
  firstView: document.querySelector(".container"),
  nav: document.querySelector("nav"),
  mainTitle: document.querySelector(".title-header"),
  navLinks: document.querySelector(".nav-links"),
  articles: document.querySelectorAll("article"),
  articleTitles: document.querySelectorAll(".article-title"),
  sectionEle: document.querySelector("section"),
  arrowBtn: document.querySelector("#arrow-btn"),
  option: {
    root: null,
    threshould: 0,
    rootMargin: "0% 0% -50% 0%",
  },
  slideOption: {
    threshould: 0,
    rootMargin: "0px 0px -100px 0px",
  },
};

const views = {
  count: 1,
  obs: new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      const entryID = entry.target.childNodes[3].id;
      data.navAnc.forEach((anc) => {
        let charIndex = anc.href.indexOf("#") + 1;
        let finId = anc.href.slice(charIndex);
        if (finId === entryID) {
          for (item of data.navAnc) {
            item.classList.remove("active");
          }
          anc.classList.toggle("active");
        }
      });
    });
  }, data.option),

  slideObs: new IntersectionObserver((entries, observe) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) {
        return;
      } else {
        e.target.classList.add("slide-in");
        views.slideObs.unobserve(e.target);
      }
    });
  }, data.slideOption),

  updateNav(id, title) {
    data.navLinks.innerHTML += `<li class="nav-items">
    <a class="nav-link" href="#${id}">${title}</a>
  </li>`;
    this.count++;
  },

  scrollFunction() {
    if (
      document.body.scrollTop > 200 ||
      document.documentElement.scrollTop > 200
    ) {
      data.arrowBtn.style.transform = "scale(1) translate(-5%, -95%)";
    } else {
      data.arrowBtn.style.transform = "scale(0)";
    }
  },
  resizeNav() {
    if (
      document.body.scrollTop > 400 ||
      document.documentElement.scrollTop > 400
    ) {
      data.nav.style.padding = "1.2rem 0";
    } else {
      data.nav.style.padding = "4rem 0";
    }
  },
  scrollToTop() {
    data.firstView.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  },
  scrollFromNav(e) {
    e.preventDefault();
    for (item of data.navAnc) {
      item.classList.remove("active");
    }
    let charIndex = e.target.href.indexOf("#") + 1;
    let finId = e.target.href.slice(charIndex);
    document.getElementById(finId).scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });

    e.target.classList.add("active");
  },
  slideArticle(element) {
    element.addEventListener("click", (e) => {
      e.target.classList.toggle("slide-left");
      e.target.nextElementSibling.classList.toggle("slide-right");
    });
  },
};

const startApp = function () {
  for (let item of data.articleTitles) {
    views.updateNav(item.id, item.innerText);
  }
  data.navAnc = document.querySelectorAll(".nav-link");
  data.articles.forEach((ar) => {
    views.obs.observe(ar);
  });

  data.articles.forEach((curArticle) => {
    views.slideObs.observe(curArticle);
  });

  window.onscroll = function () {
    if (!window.pageYOffset > 20) {
      data.mainTitle.style.transform = `translate(0px,0px)`;
    } else {
      data.mainTitle.style.transform = `translate(0px,${window.pageYOffset}px) `;
    }
    views.scrollFunction();
    views.resizeNav();
  };
  data.arrowBtn.addEventListener("click", views.scrollToTop);

  data.navLinks.addEventListener("click", views.scrollFromNav);

  data.articleTitles.forEach((articleTitle) => {
    views.slideArticle(articleTitle);
  });
};

startApp();
