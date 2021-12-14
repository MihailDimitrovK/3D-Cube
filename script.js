let offset = 0;
let startX = 0;
const link = "http://abv.bg";
const timeRotate = 1500;
let directionRotation = -1;

let intervalId;

let box = document.getElementById("box");
let allLinks = document.getElementsByClassName("link");

let linksLength = allLinks.length;

const addLink = (link) => {
  for (let i = 0; i < linksLength; i++) {
    allLinks[i].href = link;
  }
};

const removeLink = () => {
  for (let i = 0; i < linksLength; i++) {
    allLinks[i].removeAttribute("href");
  }
};

function intervalRotate() {
  intervalId = setInterval(() => {
    box.classList.add("animation");
    directionRotation === -1 ? (offset -= 90) : (offset += 90);
    offset -= offset % 90;
    box.style.transform = `rotateY(${offset}deg)`;
  }, timeRotate);
}

const clearIntervalRotateBox = () => {
  removeAnimation();
  clearInterval(intervalId);
};

const setStartX = (e) => {
  e.preventDefault();
  removeLink();
  removeAnimation();
  startX = e.pageX - offset;
};

const setStartXToFalse = () => {
  removeAnimation();
  addLink(link);
  startX = null;
};

const rotateTheCube = (e) => {
  e.preventDefault();
  if (startX) {
    offset = e.pageX - startX;
    box.style.transform = "rotateY(" + offset + "deg)";
  };

};

const removeAnimation = () => {
  box.addEventListener('transitionend', () => {
    box.classList.remove("animation");
  });
};

window.addEventListener('load', intervalRotate);
box.addEventListener("mousedown", setStartX);
box.addEventListener("mouseup", setStartXToFalse);
box.addEventListener("mousemove", rotateTheCube);
box.addEventListener("mouseover", clearIntervalRotateBox);
box.addEventListener("mouseleave", intervalRotate);
