import './style.css';

// 1. The function r (require.context(...)) gives r.keys() which are the images paths
// and r(key) which gives the built asset URL
function importAll(r) {
    return r.keys().map(r); 
}

// 2. Create a require.context instance - a webpack function
const images = importAll(
  require.context('../assets', false, /\.(png|jpe?g|svg)$/)
);

// 3. Append images and respective buttons to DOM
const container = document.querySelector('.container');
const img_window = document.querySelector('.image-window')
let img_counter = 0; //used to give unique ids to images

const btn_slide = document.querySelector(".btn-slide");
const nextBtn = document.querySelector("#fwd-btn");
const prevBtn = document.querySelector('#back-btn');

images.forEach(src => {
  setUpImg(src);
  setUpBtn();
  img_counter++;
});

function setUpImg(src) {
  const img = document.createElement('img');
  
  img.src = src; // Webpack replaces this with the final file URL
  img.setAttribute("id", `img-${img_counter}`);
  
  if (img_counter === 0) {
    img_window.appendChild(img);

  } else {
    container.appendChild(img);
  }
};

function setUpBtn() {
  const btn = document.createElement('button');
  btn.setAttribute("id", `btn-${img_counter}`);
  btn.addEventListener("click", (e) => changeSlide(e));
  btn_slide.appendChild(btn);
  if (img_counter === 0) {
    btn.classList.add("active");
  }
};

function changeSlide(e) {
  //Get the ids (just the number) of the current image and the clicked button
  const currImg = img_window.children[0];
  const id_img_current = currImg.getAttribute("id").split("-")[1];
  const id_btn_clicked = e.srcElement.id.split("-")[1];

  if (id_img_current === id_btn_clicked) {
    return
  } else {
    //Swap the images
    container.appendChild(currImg);
    const newImg = document.getElementById(`img-${id_btn_clicked}`);
    img_window.appendChild(newImg);

    //Toggle the active class to show which slide is selected
    const currBtn = document.getElementById(`btn-${id_img_current}`);
    const newBtn = document.getElementById(e.srcElement.id);
    currBtn.classList.toggle("active");
    newBtn.classList.toggle("active");
  }
};

function goNext() {
  //Get the ids (just the number) of the current image and the clicked button
  const currImg = img_window.children[0];
  const id_img_current = Number(currImg.getAttribute("id").split("-")[1]);
  const maxID = document.querySelectorAll("img").length - 1;
  let id_next = 0;

  if (id_img_current < maxID ) {
    id_next = id_img_current + 1;
  } else {
    id_next = 0;
  }

  //Swap the images
  container.appendChild(currImg);
  const newImg = document.getElementById(`img-${id_next}`);
  img_window.appendChild(newImg);

  //Toggle the active class to show which slide is selected
  const currBtn = document.getElementById(`btn-${id_img_current}`);
  const newBtn = document.getElementById(`btn-${id_next}`);
  currBtn.classList.toggle("active");
  newBtn.classList.toggle("active");
};

function goPrev() {
  //Get the ids (just the number) of the current image and the clicked button
  const currImg = img_window.children[0];
  const id_img_current = Number(currImg.getAttribute("id").split("-")[1]);
  const maxID = document.querySelectorAll("img").length - 1;
  let id_prev = 0;

  if (id_img_current > 0) {
    id_prev = id_img_current - 1;
  } else {
    id_prev = maxID;
  }

  //Swap the images
  container.appendChild(currImg);
  const newImg = document.getElementById(`img-${id_prev}`);
  img_window.appendChild(newImg);

  //Toggle the active class to show which slide is selected
  const currBtn = document.getElementById(`btn-${id_img_current}`);
  const newBtn = document.getElementById(`btn-${id_prev}`);
  currBtn.classList.toggle("active");
  newBtn.classList.toggle("active");
};

nextBtn.addEventListener("click", goNext);
prevBtn.addEventListener("click", goPrev);





