import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '33879841-ec1dd1c9c0f048473c9d8babe';

export async function getPhotos(searchQuery, page) {
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
