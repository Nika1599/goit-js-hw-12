import { fetchImages } from './js/pixabay-api';
import { renderGallery, showError, clearGallery } from './js/render-functions';

const loaderWrapper = document.querySelector('.loader-wrapper');
const loadMoreButton = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';

const refs = {
  form: document.querySelector('.js-picture-form'),
  input: document.querySelector('.js-picture-form input[name="query"]'),
  gallery: document.getElementById('gallery'),
};

refs.form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const query = refs.input.value.trim();
  if (query === '') {
    showError('Please enter a search term');
    return;
  }

  if (query !== currentQuery) {
    currentQuery = query;
    currentPage = 1;
    clearGallery();
    loadMoreButton.style.display = 'none';
  }

  loaderWrapper.style.display = 'block';

  try {
    const data = await fetchImages(currentQuery, currentPage);
    loaderWrapper.style.display = 'none';
    if (data.hits.length === 0) {
      showError(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    } else {
      renderGallery(data.hits, currentPage > 1);
      if (data.hits.length === 15) {
        loadMoreButton.style.display = 'block';
      } else {
        loadMoreButton.style.display = 'none';
      }
    }
  } catch (error) {
    loaderWrapper.style.display = 'none';
    showError('An error occurred while fetching the images. Please try again.');
  }
});

loadMoreButton.addEventListener('click', async function () {
  currentPage += 1;
  loaderWrapper.style.display = 'block';

  try {
    const data = await fetchImages(currentQuery, currentPage);
    loaderWrapper.style.display = 'none';
    renderGallery(data.hits, true);
    if (data.hits.length < 15) {
      loadMoreButton.style.display = 'none';
    }
  } catch (error) {
    loaderWrapper.style.display = 'none';
    showError('An error occurred while fetching the images. Please try again.');
  }
});
