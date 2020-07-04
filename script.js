const nav = document.querySelector("nav");
const navLinks = document.querySelector(".nav-links");
const articles = document.querySelectorAll("article");
const articleTitle = document.querySelectorAll(".article-title");
const addBtn = document.querySelector("#add-btn");
const myForm = document.querySelector("#my-form");
const closeBtn = document.querySelector("#close-btn");
const sectionEle = document.querySelector("section");
const titleInput = document.querySelector("#title");
const subjectInput = document.querySelector("#subject");
const allExpForm = document.querySelectorAll("body > *:not(#my-form)");
const arrowBtn = document.querySelector("#arrow-btn");
const option = {
  root: null,
  threshould: 0,
  rootMargin: "-50%",
};
arrowBtn.style.display = "none";
let count = 1;
let idWord = "";

function updateNav(id, title) {
  navLinks.innerHTML += `<li class="nav-items">
    <a class="nav-link" href="#${id}">${title}</a>
  </li>`;
  count++;
}

for (let item of articleTitle) {
  updateNav(item.id, item.innerText);
}
const navAnc = document.querySelectorAll(".nav-link");

const obs = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }
    const entryID = entry.target.childNodes[1].id;
    console.log(entryID);
    navAnc.forEach((anc) => {
      let charIndex = anc.href.indexOf("#") + 1;
      let finId = anc.href.slice(charIndex);
      if (finId === entryID) {
        for (item of navAnc) {
          item.classList.remove("active");
        }
        anc.classList.toggle("active");
      }
    });
  });
}, option);
articles.forEach((ar) => {
  obs.observe(ar);
});

addBtn.addEventListener("click", () => {
  myForm.style.display = "block";
  for (const item of allExpForm) {
    item.style.cssText = `filter: blur(5px)`;
  }
  nav.style.display = "none";
});

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    arrowBtn.style.display = "block";
  } else {
    arrowBtn.style.display = "none";
  }
}

arrowBtn.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  myForm.style.display = "none";

  for (const item of allExpForm) {
    item.style.cssText = `filter: blur(0px)`;
  }
  nav.style.display = "flex";
});

myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(count);
  sectionEle.innerHTML += `<article>
    <h2 class="article-title" id="article-${count}">${titleInput.value}</h2>
    <p class="article-pargraph">
        ${subjectInput.value}
    </p>`;
  idWord = `article-${count}`;
  updateNav(idWord, titleInput.value);
  subjectInput.value = "";
  titleInput.value = "";
});

navLinks.addEventListener("click", (e) => {
  e.preventDefault();
  for (item of navAnc) {
    item.classList.remove("active");
  }
  let charIndex = e.target.href.indexOf("#") + 1;
  let finId = e.target.href.slice(charIndex);
  document
    .getElementById(finId)
    .scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });

  e.target.classList.add("active");
});
