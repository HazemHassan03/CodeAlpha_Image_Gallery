let images = Array.from(document.querySelectorAll(".slides img")),
  imagesNumber = images.length,
  currentSlide = 1,
  currentIndex = document.getElementById("index"),
  prev = document.getElementById("prev"),
  next = document.getElementById("next");

if (localStorage.getItem("Current image")) {
  currentSlide = localStorage.getItem("Current image");
}

function prevSlide() {
  if (currentSlide == 1) {
    currentSlide = imagesNumber;
  } else {
    --currentSlide;
  }
  control();
}
function nextSlide() {
  if (currentSlide == imagesNumber) {
    currentSlide = 1;
  } else {
    ++currentSlide;
  }
  control();
}
prev.addEventListener("click", prevSlide);
next.addEventListener("click", nextSlide);

let nav = document.getElementById("indicators");
for (let i = 1; i <= imagesNumber; i++) {
  let navItem = document.createElement("img");
  navItem.setAttribute("data-index", i);
  navItem.setAttribute("src", `images/${i}.jpg`);
  nav.append(navItem);
}

let navItems = document.querySelectorAll("#indicators img");
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    currentSlide = parseInt(item.getAttribute("data-index"));
    control();
  });
});

function removeActives() {
  images.forEach((img) => {
    img.classList.remove("active");
  });
  navItems.forEach((item) => {
    item.classList.remove("active");
  });
}

function control() {
  currentIndex.textContent = `Image #${currentSlide} of ${imagesNumber}`;
  removeActives();
  images[currentSlide - 1].classList.add("active");
  nav.children[currentSlide - 1].classList.add("active");
  document.body.style.cssText += `
  background-image: url(images/${currentSlide}.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  `;
  localStorage.setItem("Current image", currentSlide);
}
control();
