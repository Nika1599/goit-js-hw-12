import { fetchImages } from './js/pixabay-api';
import { renderGallery, showError, clearGallery } from './js/render-functions';

const loaderWrapper = document.querySelector('.loader-wrapper');
const loadMoreButton = document.querySelector('.load-more');
const endMessage = document.createElement('p');
endMessage.textContent =
  "We're sorry, but you've reached the end of search results.";
endMessage.style.display = 'none';
document.body.appendChild(endMessage);

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

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
    totalHits = 0;
    clearGallery();
    loadMoreButton.style.display = 'none';
    endMessage.style.display = 'none';
  }

  loaderWrapper.style.display = 'block';

  try {
    const data = await fetchImages(currentQuery, currentPage);
    loaderWrapper.style.display = 'none';
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      showError(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    } else {
      renderGallery(data.hits, currentPage > 1);
      if (currentPage * 15 < totalHits) {
        loadMoreButton.style.display = 'block';
      } else {
        loadMoreButton.style.display = 'none';
        endMessage.style.display = 'block';
      }
      if (currentPage > 1) {
        scrollToNextGroup();
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

    if (currentPage * 15 >= totalHits) {
      loadMoreButton.style.display = 'none';
      endMessage.style.display = 'block';
    }
    scrollToNextGroup();
  } catch (error) {
    loaderWrapper.style.display = 'none';
    showError('An error occurred while fetching the images. Please try again.');
  }
});

function getCardHeight() {
  const gallery = document.querySelector('#gallery');
  const card = gallery.querySelector('.image-card');
  return card ? card.getBoundingClientRect().height : 0;
}

function scrollToNextGroup() {
  const cardHeight = getCardHeight();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
