import "./style.css";

//Factory function to import images
export function loadImages() {
  // 1. The function r (require.context(...)) gives r.keys() which are the images paths
  // and r(key) which gives the built asset URL
  function importAll(r) {
    return r.keys().map(r);
  }

  // 2. Create a require.context instance - a webpack function
  const images = importAll(
    require.context("../assets", false, /\.(png|jpe?g|svg)$/),
  );

  //need to return images othwerise nothing is returned and the importAll return (saved in images) is lost
  return images;
}

export function imageCarousel({
  images,
  containerSelector,
  viewportSelector,
  btnContainerSelector,
  nextBtnSelector,
  prevBtnSelector,
}) {
  // DOM references
  const container = document.querySelector(containerSelector);
  const img_window = document.querySelector(viewportSelector);
  const btn_slide = document.querySelector(btnContainerSelector);
  const nextBtn = document.querySelector(nextBtnSelector);
  const prevBtn = document.querySelector(prevBtnSelector);

  let currentIndex = 0; //used to track which image we are displaying

  //Arrays to store created elements
  const imgElements = [];
  const btnElements = [];

  function init() {
    setUpImg();
    setUpBtn();
    showImage(0);
    attachEvents();
    startAutoPlay();
  }

  function setUpImg() {
    images.forEach((src, index) => {
      const img = document.createElement("img");

      img.src = src; // Webpack replaces this with the final file URL
      img.setAttribute("id", `img-${index}`);

      if (index === 0) {
        img_window.appendChild(img);
      } else {
        container.appendChild(img);
      }

      //append the reference to the DOM node in the array
      imgElements.push(img);
    });
  }

  function setUpBtn() {
    images.forEach((_, index) => {
      const btn = document.createElement("button");
      btn.setAttribute("id", `btn-${index}`);
      if (index === 0) {
        btn.classList.add("active");
      }
      btn.addEventListener("click", () => showImage(index));
      btn_slide.appendChild(btn);

      //append the reference to the DOM node in the array
      btnElements.push(btn);
    });
  }

  function showImage(index) {
    if (index === currentIndex) return;

    //Otherwise
    container.appendChild(imgElements[currentIndex]);
    const newImg = imgElements[index];
    img_window.appendChild(newImg);

    //Toggle the active class to show which slide is selected
    //This works because in btnElements are stored references to the
    //DOM nodes and not copies!!
    const currBtn = btnElements[currentIndex];
    const newBtn = btnElements[index];
    currBtn.classList.toggle("active");
    newBtn.classList.toggle("active");

    currentIndex = index;
  }

  function goNext() {
    const nextIndex = (currentIndex + 1) % imgElements.length;
    showImage(nextIndex);
  }

  function goPrev() {
    const prevIndex =
      (currentIndex - 1 + imgElements.length) % imgElements.length;
    showImage(prevIndex);
  }

  function attachEvents() {
    nextBtn.addEventListener("click", goNext);
    prevBtn.addEventListener("click", goPrev);
  }

  function startAutoPlay(interval = 5000) {
    return (timer = setInterval(goNext, interval));
  }

  function stopAutoPlay() {
    clearInterval(timer);
  }

  return {
    init,
    goNext,
    goPrev,
    startAutoPlay,
    stopAutoPlay,
  };
}