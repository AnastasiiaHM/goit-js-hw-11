import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export let galleryImages = new SimpleLightbox('.gallery a', {
  overlayOpacity: 0.4,
  captions: true,
  captionSelector: 'img',
  captionsData: 'title',
  captionPosition: 'bottom',
  captionDelay: 250,
  animationSpeed: 250,
});
