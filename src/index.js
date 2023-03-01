import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';
import { markupGalleryCard } from './markup';
import { galleryImages } from './simplelightbox';
import { getPhotos } from './API';

const searchInputEl = document.querySelector('input');
const submitBtnEl = document.querySelector('.submit');
const lastEl = document.querySelector('.footer-page');
const containerGallery = document.querySelector('.gallery');
submitBtnEl.addEventListener('click', handleClickSubmit);

let page = 1;
let searchQuery = '';

const observer = new IntersectionObserver(entries => {
  handleScrollPage();
  console.log('test');
});

async function handleClickSubmit(e) {
  e.preventDefault();
  searchQuery = searchInputEl.value;

  const data = await getPhotos(searchQuery, page);

  const hits = data.hits;
  if (hits.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  Notify.success(`We found ${data.totalHits} pictures`);
  containerGallery.innerHTML = '';
  containerGallery.insertAdjacentHTML('beforeend', markupGalleryCard(data));

  galleryImages.refresh();
  observer.observe(lastEl);
  // searchQuery = '';
}

async function handleScrollPage() {
  page += 1;
  const data = await getPhotos(searchQuery, page);
  console.log(data);
  const queryPages = Math.ceil(data.totalHits / 40);

  if (queryPages === page - 1) {
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    observer.unobserve(lastEl);
  }
  containerGallery.insertAdjacentHTML('beforeend', markupGalleryCard(data));
}
