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

// 3. Append to DOM
const container = document.querySelector('.container');

images.forEach(src => {
  const img = document.createElement('img');
  img.src = src; // Webpack replaces this with the final file URL
  container.appendChild(img);
});