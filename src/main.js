import { fetchImages } from './js/pixabay-api';
import { renderGallery, showError, clearGallery } from './js/render-functions';

const loaderWrapper = document.querySelector('.loader-wrapper');

const refs = {
  form: document.querySelector('.js-picture-form'),
  input: document.querySelector('.js-picture-form input[name="query"]'),
  gallery: document.getElementById('gallery'),
};

refs.form.addEventListener('submit', function (e) {
  e.preventDefault();

  const query = refs.input.value.trim();
  if (query === '') {
    showError('Please enter a search term');
    return;
  }
  clearGallery();

  loaderWrapper.style.display = 'block';

  fetchImages(query)
    .then(data => {
      loaderWrapper.style.display = 'none';
      if (data.hits.length === 0) {
        showError(
          'Sorry, there are no images matching your search query. Please try again!'
        );
      } else {
        renderGallery(data.hits);
      }
    })

    .catch(error => {
      loaderWrapper.style.display = 'none';
      showError(
        'An error occurred while fetching the images. Please try again.'
      );
    });
});
