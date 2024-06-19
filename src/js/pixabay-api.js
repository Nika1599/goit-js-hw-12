const BASE_URL = `https://pixabay.com`;
const API_KEY = '44423269-f21c5bc9414954348df27e7dd';

export function fetchImages(query) {
  const END_POINT = `/api/`;
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  const url = `${BASE_URL}${END_POINT}?${params}`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      throw error;
    });
}
