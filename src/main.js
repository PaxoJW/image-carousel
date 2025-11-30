import { loadImages, imageCarousel } from "./index.js";

(() => {
    const images = loadImages();

    const carousel = imageCarousel({
        images,
        containerSelector: '.container',
        viewportSelector: '.image-window',
        btnContainerSelector: ".btn-slide",
        nextBtnSelector: "#fwd-btn",
        prevBtnSelector: '#back-btn'
    });

    carousel.init();
})();