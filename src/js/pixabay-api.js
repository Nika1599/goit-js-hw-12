import axios from 'axios';

const BASE_URL = 'https://pixabay.com';
const API_KEY = '44423269-f21c5bc9414954348df27e7dd';

export async function fetchImages(query, page = 1, per_page = 15) {
  const END_POINT = '/api/';
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page,
  });

  const url = `${BASE_URL}${END_POINT}?${params}`;

  try {
    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
