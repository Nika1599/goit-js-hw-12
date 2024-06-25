import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;

export function renderGallery(images, append = false) {
  const gallery = document.getElementById('gallery');
  const imagesHTML = images
    .map(
      image => `
      <a href="${image.largeImageURL}" class="gallery-item" data-lightbox="gallery">
        <div class="image-card">
          <img src="${image.webformatURL}" alt="${image.tags}" />
          <p>${image.tags}</p>
        </div>
      </a>
    `
    )
    .join('');

  if (append) {
    gallery.insertAdjacentHTML('beforeend', imagesHTML);
  } else {
    gallery.innerHTML = imagesHTML;
  }

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery-item', {
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
