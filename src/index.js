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

images.forEach(src => {
  setUpImg(src);
  setUpBtn();
  img_counter++;
});

function setUpBtn() {
  const btn = document.createElement('button');
  btn.setAttribute("id", `btn-${img_counter}`);
  btn.addEventListener("click", (e) => changeSlide(e));
  btn_slide.appendChild(btn);
};

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

function changeSlide(e) {
  //Get the ids of the current image and the clicked button
  const currImg = img_window.children[0];
  const id_img_current = currImg.getAttribute("id").split("-")[1];
  const id_btn_clicked = e.srcElement.id.split("-")[1];

  if (id_img_current === id_btn_clicked) {
    return
  } else {
    //Swap the images
    container.appendChild(currImg);
    img_window.appendChild(document.getElementById(`img-${id_btn_clicked}`));
  }
};






