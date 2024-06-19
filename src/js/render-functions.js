import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;

export function renderGallery(images) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = images
    .map(
      image => `
      <a href="${image.largeImageURL}" data-lightbox="gallery">
        <div class="image-card">
          <img src="${image.webformatURL}" alt="${image.tags}" />
          <p>${image.tags}</p>
        </div>
      </a>
    `
    )
    .join('');

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      /* options */
    });
  } else {
    lightbox.refresh();
  }
}

export function showError(message) {
  iziToast.error({
    title: 'Error',
    message: message,
  });
}

export function clearGallery() {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';
}
